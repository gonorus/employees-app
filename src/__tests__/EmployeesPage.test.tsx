import EmployeesPage from '@pages/EmployeesPage';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('EmployeesPage component', () => {
  test('should render the header and the employee table with empty state', () => {
    render(<EmployeesPage />);

    expect(screen.getByRole('heading', { name: /employee page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new employee/i })).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});
