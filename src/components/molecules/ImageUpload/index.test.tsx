import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import ImageUpload from './index';

describe('ImageUpload component', () => {
  const onImageSelectMock = vi.fn();

  beforeEach(() => {
    onImageSelectMock.mockClear();
  });

  test('should render the file input', () => {
    render(<ImageUpload onImageSelect={onImageSelectMock} data-testid="file-upload" />);
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  test('should show image preview and call onImageSelect when a valid image is selected', async () => {
    render(<ImageUpload onImageSelect={onImageSelectMock} data-testid="file-upload" />);

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-upload');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Image preview')).toBeInTheDocument();
      expect(onImageSelectMock).toHaveBeenCalledWith(expect.stringContaining('data:image/png;base64,'));
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  test('should show an error message for non-image file types', async () => {
    render(<ImageUpload onImageSelect={onImageSelectMock} data-testid="file-upload" />);

    const file = new File(['text'], 'document.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-upload');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Error: Only image file type is allowed.')).toBeInTheDocument();
      expect(onImageSelectMock).not.toHaveBeenCalled();
      expect(screen.queryByAltText('Image preview')).not.toBeInTheDocument();
    });
  });

  test('should show an error message for files exceeding max size', async () => {
    render(<ImageUpload onImageSelect={onImageSelectMock} data-testid="file-upload" />);

    const largeFile = new File(['a'.repeat(600 * 1024)], 'large.png', { type: 'image/png' });
    const input = screen.getByTestId('file-upload');

    fireEvent.change(input, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(screen.getByText('Error: Maximum file size allowed is 500KB.')).toBeInTheDocument();
      expect(onImageSelectMock).not.toHaveBeenCalled();
      expect(screen.queryByAltText('Image preview')).not.toBeInTheDocument();
    });
  });

  test('should clear selection when no file is chosen', async () => {
    render(<ImageUpload onImageSelect={onImageSelectMock} data-testid="file-upload" />);

    // First, select a valid file
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-upload');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Image preview')).toBeInTheDocument();
    });

    // Then, clear the selection
    fireEvent.change(input, { target: { files: [] } });

    await waitFor(() => {
      expect(screen.queryByAltText('Image preview')).not.toBeInTheDocument();
      expect(onImageSelectMock).toHaveBeenCalledWith(null);
    });
  });
});
