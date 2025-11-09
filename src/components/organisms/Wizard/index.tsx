import './index.scss';

import Button from '@atoms/Button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Step1 from './Step1';
import Step2 from './Step2';

export type RoleType = 'admin' | 'ops' | null;

interface WizardProps {
  isOpen: boolean;
  role: RoleType;
  onClose: () => void;
}

const Wizard: React.FC<WizardProps> = ({ isOpen, onClose, role }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const totalSteps = useMemo(() => role === 'admin' ? 2 : 1, [role]);

  function ResetStep(role: RoleType) {
    if (role === 'ops') {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }

  const handleSubmit = useCallback(() => {
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, select');
      const formData: Record<string, string> = {};
      formElements.forEach(element => {
        const input = element as HTMLInputElement | HTMLSelectElement;
        formData[input.name || input.id] = input.value;
      });
      console.log('Form Data:', formData);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
    else {
      alert('Employee data submitted!');
      ResetStep(role);
      onClose();
    }
  }, [currentStep, totalSteps, role, onClose]);

  useEffect(() => {
    ResetStep(role);
  }, [role]);

  if (!isOpen) {
    return null;
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className='wizard-backdrop'>
      <div className='wizard-dialog'>
        <div className='wizard-header'>
          <h2>Add New Employee</h2>
          <button onClick={onClose} className='close-button'>
            &times;
          </button>
        </div>
        <div className='wizard-content' ref={formRef}>
          {role === 'admin' && currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
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
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
