import { matchCourseAnswer } from '../../course-answer';

type Usage = {
  day: string;
  dailyCount: number;
  minuteTimestamps: number[];
};

const usageByStudent = new Map<string, Usage>();
const MAX_QUESTIONS_PER_DAY = 40;
const MAX_QUESTIONS_PER_MINUTE = 10;
const MAX_QUESTION_LENGTH = 2000;
const MINUTE_IN_MS = 60_000;

type AskRequest = {
  name?: unknown;
  question?: unknown;
};

function isAskRequest(value: unknown): value is AskRequest {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function POST(request: Request): Promise<Response> {
  let body: AskRequest;
  try {
    const payload: unknown = await request.json();
    if (!isAskRequest(payload)) {
      return Response.json({ error: 'Please submit a valid question.' }, { status: 400 });
    }
    body = payload;
  } catch {
    return Response.json({ error: 'Please submit a valid question.' }, { status: 400 });
  }

  if (typeof body.name !== 'string' || !body.name.trim()) {
    return Response.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (typeof body.question !== 'string' || !body.question.trim()) {
    return Response.json({ error: 'Please enter a question.' }, { status: 400 });
  }
  if (Array.from(body.question).length > MAX_QUESTION_LENGTH) {
    return Response.json(
      { error: 'Questions must be 2,000 characters or fewer. Please shorten your question.' },
      { status: 400 }
    );
  }

  const studentKey = body.name.trim().toLowerCase();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const usage = usageByStudent.get(studentKey);
  const currentUsage =
    usage?.day === day
      ? {
          day,
          dailyCount: usage.dailyCount,
          minuteTimestamps: usage.minuteTimestamps.filter(
            (timestamp) => now - timestamp < MINUTE_IN_MS
          ),
        }
      : { day, dailyCount: 0, minuteTimestamps: [] };

  if (currentUsage.dailyCount >= MAX_QUESTIONS_PER_DAY) {
    return Response.json(
      { error: 'You have reached the limit of 40 questions per day. Please try again tomorrow.' },
      { status: 429 }
    );
  }
  if (currentUsage.minuteTimestamps.length >= MAX_QUESTIONS_PER_MINUTE) {
    usageByStudent.set(studentKey, currentUsage);
    return Response.json(
      { error: 'You have reached the limit of 10 questions per minute. Please wait before asking again.' },
      { status: 429 }
    );
  }

  currentUsage.dailyCount += 1;
  currentUsage.minuteTimestamps.push(now);
  usageByStudent.set(studentKey, currentUsage);

  return Response.json(matchCourseAnswer(body.question));
}
