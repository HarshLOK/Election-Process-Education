import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HierarchyGraph from './HierarchyGraph';

describe('HierarchyGraph Component', () => {
  it('renders the title', () => {
    render(<HierarchyGraph />);
    expect(screen.getByText(/POLITICAL/i)).toBeInTheDocument();
    expect(screen.getByText(/HIERARCHY/i)).toBeInTheDocument();
  });
});
