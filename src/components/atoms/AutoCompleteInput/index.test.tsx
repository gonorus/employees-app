import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import AutoCompleteInput from './index';

describe('AutoCompleteInput component', () => {
  const mockOptions = [
    { value: '1', label: 'Apple' },
    { value: '2', label: 'Banana' },
    { value: '3', label: 'Cherry' },
  ];

  const mockOnInputChange = vi.fn();
  const mockOnOptionSelect = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  render(
    <AutoCompleteInput
      options={mockOptions}
      onInputChange={mockOnInputChange}
      onOptionSelect={mockOnOptionSelect}
      loading={false}
      placeholder="Search fruit..."
    />,
  );
  const input = screen.getByPlaceholderText('Search fruit...');

  test('should call onInputChange after user types with debounce', () => {
    act(async () => {
      fireEvent.change(input, { target: { value: 'App' } });
      expect(mockOnInputChange).not.toHaveBeenCalled();
      vi.advanceTimersByTime(500);
      await waitFor(() => {
        expect(mockOnInputChange).toHaveBeenCalled();
      });
    });
  });

  test('should show options when user types and hide them on blur', () => {
    act(async () => {
      fireEvent.change(input, { target: { value: 'a' } });
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      fireEvent.blur(input);
      vi.advanceTimersByTime(200);
      await waitFor(() => {
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
      });
    });
  });

  test('should select an option on click', () => {
    act(async () => {
      fireEvent.change(input, { target: { value: 'B' } });
      const optionToSelect = await screen.findByText('Banana');
      fireEvent.click(optionToSelect);

      await waitFor(() => {
        expect(mockOnOptionSelect).toHaveBeenCalledWith({ value: '2', label: 'Banana' });
        expect((input as HTMLInputElement).value).toBe('Banana');
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
      });
    });
  });

  test('should show loading indicator when loading is true and user types', () => {
    act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
      await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    });
  });
});
