import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App shell', () => {
  it('renders the hero tagline', () => {
    render(<App />);
    expect(screen.getByText(/Stories, merch, and motion labs/i)).toBeTruthy();
  });

  it('shows the search bar placeholder', () => {
    render(<App />);
    expect(screen.getAllByPlaceholderText(/Search products, art, lore/i).length).toBeGreaterThan(0);
  });

  it('shows new navigation links', async () => {
    render(<App />);
    expect((await screen.findAllByText(/Wallpapers/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Comics/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/Forum/i)).length).toBeGreaterThan(0);
  });
});
