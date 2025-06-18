import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('Navbar shows mascot image and links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByAltText(/Mascot/i)).toBeInTheDocument();
  expect(screen.getByText(/iongiveafuq.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
});
