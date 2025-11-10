import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import EmployeeTable from '.';

// Mock child components to isolate the test to EmployeeTable
vi.mock('@molecules/TableHeader', () => ({
  default: ({ headers }: { headers: string[] }) => (
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  ),
}));

vi.mock('@molecules/TableRowSkeleton', () => ({
  default: ({ columns }: { columns: number }) => (
    <tr data-testid='table-row-skeleton'>
      <td colSpan={columns}>Skeleton</td>
    </tr>
  ),
}));

describe('EmployeeTable component', () => {
  const headers = ['Name', 'Department', 'Role', 'Location', 'Photo'];

  test('should render headers correctly', () => {
    render(<EmployeeTable data={[]} />);
    headers.forEach(headerText => {
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });
  });

  test('should render skeleton rows when loading', () => {
    render(<EmployeeTable data={[]} isLoading />);
    const skeletonRows = screen.getAllByTestId('table-row-skeleton');
    expect(skeletonRows).toHaveLength(5);
  });

  test('should render empty state when data is empty and not loading', () => {
    render(<EmployeeTable data={[]} isLoading={false} />);
    const emptyCell = screen.getByText('Empty');
    expect(emptyCell).toBeInTheDocument();
    expect(emptyCell).toHaveAttribute('colSpan', String(headers.length));
  });

  test('should render nothing in the body when there is data and not loading', () => {
    const mockData = [{ id: 1, name: 'Test User' }];
    const { container } = render(
      <EmployeeTable data={mockData as []} isLoading={false} />,
    );
    const tbody = container.querySelector('tbody');
    expect(tbody?.childElementCount).toBe(0);
  });
});
