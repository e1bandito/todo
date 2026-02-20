import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { TabType } from './Sidebar';
import { MainContent } from './MainContent';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white shadow-none transition-all duration-300 md:h-[800px] md:max-w-[1000px] md:flex-row md:rounded-md md:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
    </div>
  );
};
