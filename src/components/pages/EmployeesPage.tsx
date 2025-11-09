import './EmployeePage.scss';

import Button from '@atoms/Button';
import Pagination, { type PaginationState } from '@molecules/Pagination';
import EmployeeTable from '@organisms/EmployeesTable';
import Wizard, { type RoleType } from '@organisms/Wizard';
import { useMemo, useState } from 'react';

const EmployeesPage: React.FC = () => {
  const role = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') as RoleType;
    if (roleParam === 'admin' || roleParam === 'ops') return roleParam;
    return null;
  }, []);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
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
        <Button
          variant='primary'
          onClick={() => setIsWizardOpen(true)}
          disabled={!role}>
          Add New Employee
        </Button>
      </div>
      <EmployeeTable data={[]} />
      <Pagination
        count={paginationState.count}
        page={paginationState.page}
        rowsPerPage={paginationState.rowsPerPage}
        onPageChange={OnPageChangeHandler}
        onRowsPerPageChange={OnRowsPerPageChangeHandler}
      />
      <Wizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} role={role} />
    </div>
  );
};
export default EmployeesPage;