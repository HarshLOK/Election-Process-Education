import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Component', () => {
  it('renders the welcome message', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/WELCOME TO/i)).toBeInTheDocument();
    expect(screen.getByText(/MATDATA/i)).toBeInTheDocument();
  });

  it('renders all stat cards', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/ACTIVE ELECTIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/TOTAL SEATS/i)).toBeInTheDocument();
  });

  it('renders the journey cards', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Election Lifecycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulation Mode/i)).toBeInTheDocument();
  });
});
