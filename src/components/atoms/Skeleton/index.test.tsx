import { render } from '@testing-library/react';
import { describe, expect,test } from 'vitest';

import Skeleton from '.';

describe('Skeleton component', () => {
  test('should render correctly with skeleton class', () => {
    const { container } = render(<Skeleton />);
    const skeletonElement = container.querySelector('.skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });
});
