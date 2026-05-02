import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders without crashing and shows loader initially due to React.lazy', () => {
    render(<App />);
    expect(screen.getByText(/LOADING MODULE/i)).toBeInTheDocument();
  });
});
