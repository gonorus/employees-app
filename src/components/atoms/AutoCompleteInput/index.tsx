import './index.scss';

import useDebounce from '@customHooks/useDebounce';
import React, { type ChangeEvent, useEffect, useState } from 'react';

export interface AutoCompleteOption {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  options: AutoCompleteOption[];
  onInputChange: (value: string) => void;
  onOptionSelect: (option: AutoCompleteOption) => void;
  loading: boolean;
  debounceDelay?: number;
  placeholder?: string;
}

const AutoCompleteInput: React.FC<AutoCompleteProps> = ({
  options,
  onInputChange,
  onOptionSelect,
  loading,
  debounceDelay = 500,
  placeholder = 'Type to search...',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onInputChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onInputChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option: AutoCompleteOption) => {
    setInputValue(option.label);
    setShowOptions(false);
    onOptionSelect(option);
  };

  return (
    <div className='auto-complete-input'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue && setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        placeholder={placeholder}
      />
      {showOptions && (
        <div className='auto-complete-input__options'>
          {loading ? (
            <div className='auto-complete-input__options__item'>Loading...</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className='auto-complete-input__options__item'
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
