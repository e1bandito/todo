import React from 'react';

interface CategoryTagProps {
  label: string;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  label,
  color = '#9ca3af',
  isActive,
  onClick,
}) => {
  const bgColor =
    color.startsWith('#') || color.startsWith('hsl') ? color : '#9ca3af';

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className={`cursor-pointer rounded-full border-none px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-all outline-none active:scale-95 ${
        isActive
          ? 'shadow-md ring-2 ring-gray-400 ring-offset-2 brightness-110'
          : 'hover:brightness-105'
      }`}
    >
      {label}
    </button>
  );
};
