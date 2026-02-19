import React from 'react';

interface CategoryTagProps {
  label: string;
  color: 'purple' | 'pink' | 'orange';
}

const colorMap = {
  purple: 'bg-[#a28ed4]',
  pink: 'bg-[#ec7bb4]',
  orange: 'bg-[#ec9f73]',
};

export const CategoryTag: React.FC<CategoryTagProps> = ({ label, color }) => {
  return (
    <button
      className={`cursor-pointer rounded-full border-none px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-transform outline-none active:scale-95 ${colorMap[color]}`}
    >
      {label}
    </button>
  );
};
