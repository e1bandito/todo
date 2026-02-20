import React from 'react';

interface CategoryTagProps {
  label: string;
  color?: 'purple' | 'pink' | 'orange' | 'blue' | 'none';
  isActive?: boolean;
  onClick?: () => void;
}

const colorMap = {
  purple: 'bg-[#a28ed4]',
  pink: 'bg-[#ec7bb4]',
  orange: 'bg-[#ec9f73]',
  blue: 'bg-[#5fbcd3]',
  none: 'bg-gray-400',
};

export const CategoryTag: React.FC<CategoryTagProps> = ({
  label,
  color = 'none',
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full border-none px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-all outline-none active:scale-95 ${
        colorMap[color as keyof typeof colorMap] || colorMap.none
      } ${isActive ? 'ring-2 ring-gray-400 ring-offset-2 brightness-110' : 'hover:brightness-105'}`}
    >
      {label}
    </button>
  );
};
