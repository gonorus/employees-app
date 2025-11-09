import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
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

export interface WizardState {
  fullName?: string;
  email?: string;
  department?: string;
  role?: string;
  employeeID?: string;
  photo?: string;
  employmentType?: string;
  officeLocation?: string;
  notes?: string;
  setData: (data: Partial<WizardState>) => void;
  reset: () => void;
}

export const createWizardStore = (role: 'admin' | 'ops') => {
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
