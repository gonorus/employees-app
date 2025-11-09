import './index.scss';

import React, { useMemo } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'warning' | 'error';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const className = useMemo(() => ['button', `button--${variant}`].join(' '), [variant]);

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;