import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders Dumbo component', () => {
    render(<App />);
    expect(screen.getByText(/Meet\s+Dumbo!/i)).toBeTruthy();
  });

  it('shows Store link in navbar', () => {
    render(<App />);
    expect(screen.getByText(/Store/i)).toBeTruthy();
  });
});
