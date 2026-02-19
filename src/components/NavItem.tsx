import React from 'react';

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-3 border-b-2 px-4 py-3 text-sm font-medium transition-colors outline-none md:justify-start md:border-b-0 md:border-l-4 md:px-6 ${
        isActive
          ? 'z-10 border-cyan-500 bg-white text-cyan-500 shadow-sm'
          : 'border-transparent text-gray-400 hover:text-gray-600'
      }`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: icon }}
        className="flex items-center justify-center"
      />
      <span className="hidden whitespace-nowrap md:inline">{label}</span>
    </button>
  );
};
