'use client';

import { FormEvent, useState } from 'react';

type AnswerResponse = {
  answer: string;
  source: string;
};

const courseKnowledge = [
  {
    keywords: ['attendance', 'attend', 'present', 'participation'],
    answer:
      'Attendance is required for class participation and is tracked in the course syllabus. Students are expected to attend scheduled sessions, arrive on time, and participate in class activities as listed in the course schedule and attendance policy.',
    source: 'Syllabus — Attendance Policy',
  },
  {
    keywords: ['deadline', 'due date', 'assignment', 'submit', 'submission', 'due', 'friday', '11:59'],
    answer:
      'All assignments are due Fridays at 11:59 PM through the course portal. Assignment deadlines are listed in the course schedule and should be checked before submission. Late work is handled according to the late policy described in the syllabus.',
    source: 'Syllabus — Course Schedule and Assignment Deadlines',
  },
  {
    keywords: ['late', 'late policy', 'late work', 'extend', 'extension', '10%', '3 days'],
    answer:
      'Late work is accepted only under the conditions described in the late policy section of the syllabus. Assignments submitted up to 3 days after the deadline receive a 10% penalty per day, and extensions are not automatic unless approved by the instructor in advance.',
    source: 'Syllabus — Late Work Policy',
  },
  {
    keywords: ['office hours', 'hours', 'contact', 'office', 'instructor', 'tuesday', 'thursday', '3:00', '4:30', 'room 214'],
    answer:
      'Office hours are Tuesday and Thursday from 3:00 PM to 4:30 PM in Room 214, or by appointment. Students should attend office hours or contact Dr. Sarah Chen at sarah.chen@university.edu for questions about course concepts, assignments, grading, and course policies.',
    source: 'Syllabus — Office Hours and Contact Information',
  },
  {
    keywords: ['grade', 'grading', 'percent', 'weight', 'final grade'],
    answer:
      'The final grade is based on the categories and weights described in the grading section of the syllabus. Students should review the grading breakdown for participation, assignments, quizzes, and the final project before the semester begins.',
    source: 'Syllabus — Grading Breakdown',
  },
  {
    keywords: ['participation', 'class participation', 'engagement'],
    answer:
      'Participation is part of the grade and is based on attendance, preparation, and active classroom engagement. Students should come prepared and contribute to class activities as described in the participation policy.',
    source: 'Syllabus — Participation Requirements',
  },
  {
    keywords: ['email', 'contact', 'questions', 'reach out', 'sarah', 'dr. sarah'],
    answer:
      'Students should contact Dr. Sarah Chen through the university email address listed in the syllabus, sarah.chen@university.edu, for questions that are not answered in class or during office hours. The preferred contact method is the course email listed in the course information section.',
    source: 'Syllabus — Course Contact Information',
  },
  {
    keywords: ['schedule', 'class schedule', 'session', 'week'],
    answer:
      'The course schedule lists the weekly topics, required readings, and assignment deadlines. Students should check the schedule before each week to stay on track with upcoming work and expectations.',
    source: 'Syllabus — Course Schedule',
  },
  {
    keywords: ['extension', 'extensions', 'excused absence', 'miss class', 'absence', 'excused', 'three unexcused absences'],
    answer:
      'Students may request an extension or excused absence only under the conditions described in the course policies section of the syllabus. More than three unexcused absences may affect the final grade, and absences or extensions are not automatic; students should contact the instructor as early as possible.',
    source: 'Syllabus — Absence and Extension Policies',
  },
  {
    keywords: ['exam', 'final exam', 'midterm', 'test', 'october 18', 'december 12', '10:00 am', '9:00 am'],
    answer:
      'The midterm exam is scheduled for October 18 at 10:00 AM, and the final exam is scheduled for December 12 at 9:00 AM. Course exams and assessments are scheduled according to the exam policy in the syllabus, and students should review the exam dates and academic integrity expectations before each assessment.',
    source: 'Syllabus — Exams and Assessment Policy',
  },
  {
    keywords: ['reading', 'readings', 'required reading', 'textbook', 'materials'],
    answer:
      'Required readings and course materials are listed in the weekly schedule and course overview. Students are expected to complete the assigned readings before class to be prepared for discussions and activities.',
    source: 'Syllabus — Required Reading and Materials',
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
