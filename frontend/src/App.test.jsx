import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders Dumbo component', () => {
    render(<App />);
    expect(screen.getByText(/Meet\s+Dumbo!/i)).toBeTruthy();
  });

  it('renders Navbar and mascot image', () => {
    render(<App />);
    expect(screen.getByText(/iongiveafuq.com/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Mascot/i)).toBeInTheDocument();
  });
});
