import './index.scss';

import TableHeaderRow from '@molecules/TableHeader';
import TableRowSkeleton from '@molecules/TableRowSkeleton';
import { useMemo } from 'react';

interface EmployeeTableProps {
  data: [];
  isLoading?: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ isLoading = false, data }) => {
  const headers = useMemo(() => ['Name', 'Department', 'Role', 'Location', 'Photo'], []);

  const TableBodyContent = useMemo(() => {
    if(isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <TableRowSkeleton key={index} columns={headers.length} />
      ));
    }
    if(data.length === 0) {
      return <tr><td colSpan={headers.length}>Empty</td></tr>;
    }
    return null;
  }, [isLoading, headers, data]);

  return (
    <table className='employees-table'>
      <TableHeaderRow headers={headers} />
      <tbody>
        {TableBodyContent}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
