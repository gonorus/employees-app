import './index.scss';

import Button from '@atoms/Button';
import { useEffect, useMemo, useRef, useState } from 'react';

import Step1 from './Step1';
import Step2 from './Step2';
import { createWizardStore } from './WizardStore';

export type RoleType = 'admin' | 'ops';

interface WizardProps {
  isOpen: boolean;
  role: RoleType;
  onClose: () => void;
}

const Wizard: React.FC<WizardProps> = ({ isOpen, onClose, role }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const useStore = useMemo(() => {
    return createWizardStore(role);
  }, [role]);

  const wizardState = useStore(state => state);
  const setWizardState = useStore(state => state.setData);
  const resetWizardState = useStore(state => state.reset);
  const totalSteps = useMemo(() => role === 'admin' ? 2 : 1, [role]);

  const ConstructWizardStep = (role: RoleType) => {
    if (role === 'ops') {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  };

  useEffect(() => {
    ConstructWizardStep(role);
  }, [role]);

  const SavingIntoDraft = () => {
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, select, textarea');
      const formData: Record<string, string> = {};
      formElements.forEach(element => {
        const input = element as HTMLInputElement | HTMLSelectElement;
        formData[input.name] = input.value;
      });
      setWizardState(formData);
    }
  };

  const handleSubmit = () => {
    SavingIntoDraft();
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Final Form Data:', wizardState);
      alert('Employee data submitted!');
      ConstructWizardStep(role);
      resetWizardState();
      onClose();
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
