import type { BasicInfo } from '@infrastructures/BasicInfoRepository';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { RoleType } from '.';

const initialState: Omit<WizardState, 'setData' | 'reset'> = {
  fullName: undefined,
  email: undefined,
  department: undefined,
  role: undefined,
  employeeID: undefined,
  photo: undefined,
  employmentType: undefined,
  officeLocation: undefined,
  notes: undefined,
};

export interface WizardState extends Partial<BasicInfo> {
  photo?: string;
  employmentType?: string;
  officeLocation?: string;
  notes?: string;
  setData: (data: Partial<WizardState>) => void;
  reset: () => void;
}

export const createWizardStore = (role: RoleType) => {
  const store = create<WizardState>()(
    persist(
      (set) => ({
        ...initialState,
        setData: (data) => set((state) => ({ ...state, ...data })),
        reset: () => set(initialState),
      }),
      {
        name: role === 'admin' ? 'draft_admin' : 'draft_ops',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
  return store;
};
