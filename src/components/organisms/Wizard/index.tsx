import './index.scss';

import Button from '@atoms/Button';
import LoadingSpinner from '@atoms/LoadingSpinner';
import useUserMonitorActivity from '@customHooks/useUserMonitorActivity';
import { type BasicInfo,BasicInfoRepository } from '@infrastructures/BasicInfoRepository';
import { type Details,DetailsRepository } from '@infrastructures/DetailsRepository';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Step1 from './Step1';
import Step2 from './Step2';
import { createWizardStore } from './WizardStore';

export type RoleType = 'admin' | 'ops' | 'unknown';

interface WizardProps {
  isOpen: boolean;
  role: RoleType;
  onClose: () => void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Wizard: React.FC<WizardProps> = ({ isOpen, onClose, role }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const userMonitorActivity = useUserMonitorActivity(2000);
  const NewEmployeeBasicInfo = useMutation<string, Error, BasicInfo>({
    mutationFn: (payload) => BasicInfoRepository.addEmployeeBasicInfo(payload),
    onSuccess: async () => {
      await sleep(3000);
      console.log('✅ basicInfo saved!');
    },
  });
  const NewEmployeeDetails = useMutation<string, Error, Details>({
    mutationFn: (payload) => DetailsRepository.addEmployeeDetails(payload),
    onSuccess: async () => {
      await sleep(3000);
      console.log('✅ details saved!');
    },
  });


  const useStore = useMemo(() => {
    return createWizardStore(role);
  }, [role]);

  const wizardState = useStore(state => state);
  const setWizardState = useStore(state => state.setData);
  const resetWizardState = useStore(state => state.reset);
  const totalSteps = useMemo(() => role === 'admin' ? 2 : 1, [role]);

  const ConstructWizardStep = useCallback((role: RoleType) => {
    if (role === 'ops') {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, []);

  const SavingIntoDraft = useCallback(() => {
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, select, textarea');
      const formData: Record<string, string> = {};
      formElements.forEach(element => {
        const input = element as HTMLInputElement | HTMLSelectElement;
        formData[input.name] = input.value;
      });
      setWizardState(formData);
    }
  }, [setWizardState]);

  const SubmittingData = useCallback(async () => {
    setIsSubmitting(true);
    try {
      console.log('⏳ Submitting basicInfo…');
      await NewEmployeeBasicInfo.mutateAsync({
        department: wizardState.department ?? '',
        email: wizardState.email ?? '',
        employeeID: wizardState.employeeID ?? '',
        fullName: wizardState.fullName ?? '',
        role: wizardState.role ?? '',
      });
      console.log('⏳ Submitting details…');
      await NewEmployeeDetails.mutateAsync({
        employmentType: wizardState.employmentType ?? '',
        notes: wizardState.notes ?? '',
        officeLocation: wizardState.officeLocation ?? '',
        photo: wizardState.photo ?? '',
      });

      console.log('🎉 All data processed successfully!');
    } catch (error) {
      console.error('An error occurred during submission:', error);
    } finally {
      setIsSubmitting(false);
      ConstructWizardStep(role);
      resetWizardState();
      onClose();
    }
  }, [
    role,
    wizardState,
    NewEmployeeBasicInfo,
    NewEmployeeDetails,
    ConstructWizardStep,
    resetWizardState,
    onClose,
  ]);

  useEffect(() => {
    ConstructWizardStep(role);
  }, [role, ConstructWizardStep]);

  useEffect(() => {
    if(!userMonitorActivity) {
      SavingIntoDraft();
    }
  }, [userMonitorActivity, SavingIntoDraft]);

  const handleSubmit = async () => {
    SavingIntoDraft();
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      SubmittingData();
    }
  };

  const OnClosingHandler = () => {
    SavingIntoDraft();
    onClose();
  };

  if (!isOpen || !useStore) {
    return null;
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      SavingIntoDraft();
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className='wizard-backdrop'>
      <div className='wizard-dialog'>
        {isSubmitting && <LoadingSpinner />}
        <div className='wizard-header'>
          <h2>Add New Employee</h2>
          <button onClick={OnClosingHandler} className='close-button'>
            &times;
          </button>
        </div>
        <div className='wizard-content' ref={formRef}>
          {currentStep === 1 && <Step1 useStore={useStore} />}
          {currentStep === 2 && <Step2 useStore={useStore} />}
        </div>
        <div className='wizard-footer'>
          <Button className={role === 'admin' ? undefined : '--hidden'}
            variant='warning'
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button onClick={handleSubmit} variant='primary'>
            {currentStep === 1 ? 'Next' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
