import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Pagination from './index';

describe('Pagination component', () => {
  const defaultProps = {
    count: 100,
    page: 0,
    rowsPerPage: 10,
    onPageChange: vi.fn(),
    onRowsPerPageChange: vi.fn(),
  };

  test('should render correctly on the first page', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByLabelText('Rows per page:')).toHaveValue('10');
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
  });

  test('should render correctly on a middle page', () => {
    render(<Pagination {...defaultProps} page={5} />);

    expect(screen.getByText('Page 6 of 10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
  });

  test('should render correctly on the last page', () => {
    render(<Pagination {...defaultProps} page={9} />);

    expect(screen.getByText('Page 10 of 10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  test('should call onPageChange with the next page when "Next" is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('should call onPageChange with the previous page when "Previous" is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} page={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('should call onRowsPerPageChange and reset page when rows per page is changed', () => {
    const onPageChange = vi.fn();
    const onRowsPerPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />,
    );

    const select = screen.getByLabelText('Rows per page:');
    fireEvent.change(select, { target: { value: '25' } });

    expect(onRowsPerPageChange).toHaveBeenCalledWith(25);
    expect(onPageChange).toHaveBeenCalledWith(0);
  });
});
