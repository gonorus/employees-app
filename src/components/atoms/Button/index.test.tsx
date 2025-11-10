import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Button from './index';

describe('Button component', () => {
  test('renders with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('handles onClick events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  test('applies primary class by default', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass(
      'button--primary',
    );
  });

  test.each(['primary', 'warning', 'error'] as const)(
    'applies the correct class for variant "%s"',
    (variant) => {
      render(<Button variant={variant}>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toHaveClass(`button--${variant}`);
    },
  );

  test('does not recompute className on re-render with same variant', () => {
    const { rerender } = render(<Button variant="warning">Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('button--warning');

    rerender(<Button variant="warning" data-testid="re-rendered">Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass('button--warning');
    expect(screen.getByTestId('re-rendered')).toBeInTheDocument();
  });
});
