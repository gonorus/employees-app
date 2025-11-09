import './index.scss';

import EmployeesPage from '@pages/EmployeesPage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeesPage />
  </StrictMode>,
);
