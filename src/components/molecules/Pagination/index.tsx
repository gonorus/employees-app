import './index.scss';

import Button from '@atoms/Button';
import React, { type ChangeEvent,useMemo } from 'react';

export interface PaginationState {
  /**
   * Total number of items.
   */
  count: number;
  /**
   * The current page (zero-based).
   */
  page: number;
  /**
   * The number of rows per page (limit).
   */
  rowsPerPage: number;
}

interface PaginationProps extends PaginationState {
  /**
   * Callback fired when the page is changed.
   */
  onPageChange: (newPage: number) => void;
  /**
   * Callback fired when the number of rows per page is changed.
   */
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  /**
   * Options for the rows per page select.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}) => {
  const totalPages = useMemo(() => Math.ceil(count / rowsPerPage), [count, rowsPerPage]);
  const isFirstPage = useMemo(() => page === 0, [page]);
  const isLastPage = useMemo(() => page >= totalPages - 1, [totalPages, page]);

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
    onPageChange(0);
  };

  return (
    <div className="pagination-container">
      <div className="pagination__rows-control">
        <label className="pagination__select-label" htmlFor='pagination__select'>Rows per page:</label>
        <select
          id='pagination__select'
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="pagination__select"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="pagination__page-info">
        Page {page + 1} of {totalPages}
      </div>
      <div className="pagination__navigation">
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage}
          className="pagination__button"
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage}
          className="pagination__button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default Pagination;