import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import EmployeesPage from './EmployeesPage';

const queryClient = new QueryClient();

const EmployeesPageWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <EmployeesPage />
  </QueryClientProvider>
);

export default EmployeesPageWrapper;
