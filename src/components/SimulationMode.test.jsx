import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimulationMode from './SimulationMode';

describe('SimulationMode Component', () => {
  it('renders role selection', () => {
    render(<SimulationMode />);
    expect(screen.getByText(/SELECT YOUR ROLE/i)).toBeInTheDocument();
  });
});
