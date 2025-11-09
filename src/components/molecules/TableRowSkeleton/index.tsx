import Skeleton from '@atoms/Skeleton';
import React from 'react';

interface TableRowSkeletonProps {
  /**
   * number of column should render the skeleton component on each row
   */
  columns: number;
}

const TableRowSkeleton: React.FC<TableRowSkeletonProps> = ({ columns }) => {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}><Skeleton /></td>
      ))}
    </tr>
  );
};

export default TableRowSkeleton;