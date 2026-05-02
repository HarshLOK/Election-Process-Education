import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataDashboard from './DataDashboard';

describe('DataDashboard Component', () => {
  it('renders the dashboard title', () => {
    render(<DataDashboard />);
    expect(screen.getByText(/ELECTION/i)).toBeInTheDocument();
    expect(screen.getByText(/ANALYTICS/i)).toBeInTheDocument();
  });
});
