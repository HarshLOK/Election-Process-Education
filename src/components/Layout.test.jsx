import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders navigation items', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(screen.getByText(/Mission Control/i)).toBeInTheDocument();
  });
});
