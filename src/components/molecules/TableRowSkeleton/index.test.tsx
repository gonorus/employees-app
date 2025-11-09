import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import TableRowSkeleton from '.';

describe('TableRowSkeleton component', () => {
  test('should render the correct number of skeleton columns', () => {
    const columns = 5;
    render(<TableRowSkeleton columns={columns} />);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(columns);

    cells.forEach(cell => {
      expect(cell.querySelector('.skeleton')).toBeInTheDocument();
    });
  });
});
