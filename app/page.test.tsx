import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './page';

describe('Story 1: student asks course materials question', () => {
  it('renders the student question form and allows a grounded answer', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const nameInput = screen.getByLabelText(/your name/i);
    const questionInput = screen.getByLabelText(/your question/i);

    await user.type(nameInput, 'Ava');
    await user.type(questionInput, 'What is the attendance policy?');
    await user.click(screen.getByRole('button', { name: /ask question/i }));

    expect(await screen.findByRole('heading', { name: /answer/i })).toBeInTheDocument();
    expect(screen.getByText(/attendance is required for class participation/i)).toBeInTheDocument();
    expect(screen.getByText(/example syllabus — attendance policy/i)).toBeInTheDocument();
  });

  it('cites the example syllabus section used for the answer without inventing a page number', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText(/your name/i), 'Ava');
    await user.type(screen.getByLabelText(/your question/i), 'When are assignments due?');
    await user.click(screen.getByRole('button', { name: /ask question/i }));

    expect(
      await screen.findByText(/example syllabus — course schedule and assignment deadlines/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/page \d+/i)).not.toBeInTheDocument();
  });

  it('refuses to guess when the course materials do not support the answer', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText(/your name/i), 'Ava');
    await user.type(screen.getByLabelText(/your question/i), 'What is the capital of France?');
    await user.click(screen.getByRole('button', { name: /ask question/i }));

    expect(await screen.findByText(/cannot determine from the available course materials/i)).toBeInTheDocument();
    expect(screen.getByText('No source found')).toBeInTheDocument();
  });
});

describe('Story 2: student can verify an answer source', () => {
  it('cites the participation section for a participation question', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText(/your name/i), 'Ava');
    await user.type(screen.getByLabelText(/your question/i), 'How is class participation graded?');
    await user.click(screen.getByRole('button', { name: /ask question/i }));

    expect(
      await screen.findByText(/example syllabus — participation requirements/i)
    ).toBeInTheDocument();
  });
});
