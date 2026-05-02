import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElectionTypes from './ElectionTypes';

describe('ElectionTypes Component', () => {
  it('renders correctly', () => {
    render(<ElectionTypes />);
    expect(screen.getByText(/Types of Elections/i)).toBeInTheDocument();
  });
});
