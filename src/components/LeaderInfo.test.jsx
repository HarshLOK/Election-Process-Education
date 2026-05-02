import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeaderInfo from './LeaderInfo';

describe('LeaderInfo Component', () => {
  it('renders search input', () => {
    render(<LeaderInfo />);
    expect(screen.getByPlaceholderText(/Search leaders/i)).toBeInTheDocument();
  });
});
