import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { App } from './index';

describe('App component', () => {
  test('renders all static elements correctly', () => {
    render(<App />);
    const heading = screen.getByText('Vite + React');
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/Edit/)).toBeInTheDocument();
    expect(screen.getByText(/Click on the Vite and React logos/)).toBeInTheDocument();

    const viteLogo = screen.getByAltText('Vite logo');
    expect(viteLogo).toBeInTheDocument();
    expect(viteLogo.closest('a')).toHaveAttribute('href', 'https://vite.dev');

    const reactLogo = screen.getByAltText('React logo');
    expect(reactLogo).toBeInTheDocument();
    expect(reactLogo.closest('a')).toHaveAttribute('href', 'https://react.dev');
  });

  test('increments count when button is clicked', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is/i });

    expect(button).toHaveTextContent('count is 0');

    await fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');

    await fireEvent.click(button);
    expect(button).toHaveTextContent('count is 2');
  });
});