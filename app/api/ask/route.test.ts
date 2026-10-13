/** @jest-environment node */

import { POST } from './route';

function ask(name: string, question: string) {
  return POST(
    new Request('http://localhost/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, question }),
    })
  );
}

describe('SEC-022 question limits', () => {
  it('allows no more than 10 questions from one student in a rolling minute', async () => {
    for (let count = 0; count < 10; count += 1) {
      expect((await ask('Minute-limit student', 'What is office hours?')).status).toBe(200);
    }

    const response = await ask('Minute-limit student', 'What is office hours?');

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringMatching(/10 questions per minute/i),
    });
  });

  it('allows no more than 40 questions from one student per calendar day', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    try {
      for (let count = 0; count < 40; count += 1) {
        expect((await ask('Daily-limit student', 'What is office hours?')).status).toBe(200);
        if ((count + 1) % 10 === 0) {
          jest.advanceTimersByTime(60_001);
        }
      }

      const response = await ask('Daily-limit student', 'What is office hours?');

      expect(response.status).toBe(429);
      await expect(response.json()).resolves.toMatchObject({
        error: expect.stringMatching(/40 questions per day/i),
      });
    } finally {
      jest.useRealTimers();
    }
  });

  it('accepts a question that is exactly 2,000 characters long', async () => {
    const response = await ask('Maximum-length student', 'a'.repeat(2000));

    expect(response.status).toBe(200);
  });

  it('rejects a question longer than 2,000 characters and asks the student to shorten it', async () => {
    const response = await ask('Long-question student', 'a'.repeat(2001));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringMatching(/2,000 characters.*shorten/i),
    });
  });
});
