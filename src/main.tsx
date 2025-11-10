import './index.scss';

import EmployeesPageWrapper from '@pages/EmployeesPageWrapper';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeesPageWrapper />
  </StrictMode>,
);
