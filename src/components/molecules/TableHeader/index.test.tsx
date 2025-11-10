import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import TableHeaderRow from '.';

describe('TableHeaderRow component', () => {
  test('should render headers correctly', () => {
    const headers = ['Header 1', 'Header 2', 'Header 3'];
    render(<TableHeaderRow headers={headers} />);

    const headerElements = screen.getAllByRole('columnheader');
    expect(headerElements).toHaveLength(headers.length);

    headerElements.forEach((headerElement, index) => {
      expect(headerElement.textContent).toBe(headers[index]);
    });
  });
});
