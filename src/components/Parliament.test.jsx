import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Parliament from './Parliament';

describe('Parliament Component', () => {
  it('renders the header', () => {
    render(<Parliament />);
    expect(screen.getByText(/PARLIAMENTARY/i)).toBeInTheDocument();
    expect(screen.getByText(/SEATING/i)).toBeInTheDocument();
  });
});
