import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizArena from './QuizArena';

describe('QuizArena Component', () => {
  it('renders the initial quiz introduction', () => {
    render(<QuizArena />);
    expect(screen.getByText(/QUIZ/i)).toBeInTheDocument();
    expect(screen.getByText(/ARENA/i)).toBeInTheDocument();
    expect(screen.getByText(/Test your civic knowledge/i)).toBeInTheDocument();
  });

  it('renders the start button', () => {
    render(<QuizArena />);
    expect(screen.getByRole('button', { name: /START QUIZ/i })).toBeInTheDocument();
  });
});
