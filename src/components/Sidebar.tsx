import React from 'react';
import { NavItem } from './NavItem';

export type TabType = 'all' | 'favorites' | 'trash';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const icons = {
  all: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
  trash:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
  favorites:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="flex w-full flex-col border-b border-gray-100 bg-white/50 pt-4 shadow-sm md:w-64 md:border-r md:border-b-0 md:pt-8">
      <div className="relative mb-4 px-6 md:mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-gray-100 bg-white px-4 py-2 pr-10 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <nav className="flex flex-row space-x-2 px-4 md:flex-col md:space-y-0.5 md:space-x-0 md:px-0">
        <NavItem
          icon={icons.all}
          label="All notes"
          isActive={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        />
        <NavItem
          icon={icons.favorites}
          label="Favorites"
          isActive={activeTab === 'favorites'}
          onClick={() => setActiveTab('favorites')}
        />
        <NavItem
          icon={icons.trash}
          label="Trash"
          isActive={activeTab === 'trash'}
          onClick={() => setActiveTab('trash')}
        />
      </nav>
    </aside>
  );
};
