import './index.scss';

import React, { useMemo } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'warning' | 'error';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const generatedClassName = useMemo(
    () => ['button', `button--${variant}`, className].join(' '),
    [variant, className],
  );

  return (
    <button className={generatedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;