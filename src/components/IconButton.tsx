import React from 'react';

interface IconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className = '',
  ariaLabel,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
