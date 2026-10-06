'use client';

import { FormEvent, useState } from 'react';

type AnswerResponse = {
  answer: string;
  source: string;
};

const courseKnowledge = [
  {
    keywords: ['attendance', 'attend', 'present'],
    answer:
      'Attendance is required for class participation and is tracked in the course syllabus. Students should attend the sessions listed in the course schedule and follow the attendance policy described in the syllabus.',
    source: 'Syllabus — Attendance Policy',
  },
  {
    keywords: ['deadline', 'due date', 'assignment', 'submit'],
    answer:
      'Assignment deadlines are listed in the course schedule and should be checked before submission. Late work is handled according to the late policy described in the syllabus.',
    source: 'Syllabus — Course Schedule',
  },
  {
    keywords: ['office hours', 'hours', 'contact'],
    answer:
      'Office hours are listed in the course syllabus and are intended for questions about course concepts, assignments, and policies.',
    source: 'Syllabus — Office Hours',
  },
];

function matchCourseAnswer(question: string): AnswerResponse | null {
  const normalized = question.toLowerCase();

  const match = courseKnowledge.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );

  if (!match) {
    return {
      answer:
        'I cannot determine from the available course materials. Please ask about course content or contact the instructor for clarification.',
      source: 'Course materials review',
    };
  }

  return {
    answer: match.answer,
    source: match.source,
  };
}

export default function HomePage() {
  const [studentName, setStudentName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AnswerResponse | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentName.trim() || !question.trim()) {
      return;
    }

    setAnswer(matchCourseAnswer(question));
  };

  return (
    <main>
      <h1>Office Hours Bot</h1>
      <p>Ask a question about the course materials and get an answer grounded in the approved syllabus and lecture content.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="student-name">
          Your name
          <input
            id="student-name"
            name="studentName"
            type="text"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter your name"
            aria-label="Your name"
          />
        </label>

        <label htmlFor="student-question">
          Your question
          <textarea
            id="student-question"
            name="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a course-related question"
            aria-label="Your question"
          />
        </label>

        <button type="submit">Ask Question</button>
      </form>

      {answer && (
        <section className="answer-box" aria-live="polite">
          <h2>Answer</h2>
          <p>{answer.answer}</p>
          <p>
            <strong>Source:</strong> {answer.source}
          </p>
        </section>
      )}
    </main>
  );
}
