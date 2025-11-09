import EmployeesPage from '@pages/EmployeesPage';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('EmployeesPage component', () => {
  test('should render the header and the employee table with empty state', () => {
    window.history.pushState({}, '', '/');
    render(<EmployeesPage />);

    expect(screen.getByRole('heading', { name: /employee page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new employee/i })).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  test('should disable "Add New Employee" button when role is not present in query params', () => {
    window.history.pushState({}, '', '/');
    render(<EmployeesPage />);

    const addButton = screen.getByRole('button', { name: /add new employee/i });
    expect(addButton).toBeDisabled();
  });

  test('should enable "Add New Employee" button when role is present in query params', () => {
    window.history.pushState({}, '', '/?role=admin');
    render(<EmployeesPage />);

    const addButton = screen.getByRole('button', { name: /add new employee/i });
    expect(addButton).toBeEnabled();
  });
});
