import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElectionLifecycle from './ElectionLifecycle';

describe('ElectionLifecycle Component', () => {
  it('renders the title', () => {
    render(<ElectionLifecycle />);
    expect(screen.getByText(/ELECTION/i)).toBeInTheDocument();
    expect(screen.getByText(/LIFECYCLE/i)).toBeInTheDocument();
  });
});
