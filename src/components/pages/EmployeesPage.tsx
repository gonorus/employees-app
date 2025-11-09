import './EmployeePage.scss';

import Button from '@atoms/Button';
import Pagination, { type PaginationState } from '@molecules/Pagination';
import EmployeeTable from '@organisms/EmployeesTable';
import { useState } from 'react';

const EmployeesPage: React.FC = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    count: 100,
    page: 0,
    rowsPerPage: 10,
  });

  const OnPageChangeHandler = (selectedPage: number) => {
    setPaginationState(prev => ({ ...prev, page: selectedPage }));
  };

  const OnRowsPerPageChangeHandler = (selectedLimit: number) => {
    setPaginationState(prev => ({ ...prev, rowsPerPage: selectedLimit }));
  };

  return (
    <div className='employee-page'>
      <div className='employee-page--header'>
        <h1>Employee Page</h1>
        <Button variant='primary'>Add New Employee</Button>
      </div>
      <EmployeeTable data={[]} />
      <Pagination
        count={paginationState.count}
        page={paginationState.page}
        rowsPerPage={paginationState.rowsPerPage}
        onPageChange={OnPageChangeHandler}
        onRowsPerPageChange={OnRowsPerPageChangeHandler}
      />
    </div>
  );
};
export default EmployeesPage;