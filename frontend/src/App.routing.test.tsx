import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('routing', () => {
  it('navigates to Store page', () => {
    render(<App />);
    act(() => {
      window.history.pushState({}, '', '/store');
    });
    expect(screen.getByText(/Grab your fuqs/i)).toBeTruthy();
  });
});
