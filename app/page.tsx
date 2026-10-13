'use client';

import { FormEvent, useState } from 'react';
import type { AnswerResponse } from './course-answer';

export default function HomePage() {
  const [studentName, setStudentName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AnswerResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentName.trim() || !question.trim()) {
      return;
    }

    setError('');
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, question }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? 'Your question could not be processed. Please try again.');
        return;
      }

      setAnswer(result as AnswerResponse);
    } catch {
      setError('The question could not be sent. Please check your connection and try again.');
    }
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

      {error && <p role="alert">{error}</p>}

      {answer && (
        <section className="answer-box" aria-live="polite">
          <h2>Answer</h2>
          <p>{answer.answer}</p>
          <p>
            <strong>Source:</strong>{' '}
            {answer.citation
              ? `${answer.citation.document} — ${answer.citation.section}${answer.citation.page ? `, page ${answer.citation.page}` : ''}`
              : 'No source found'}
          </p>
        </section>
      )}
    </main>
  );
}
