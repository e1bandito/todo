import React from 'react';
import { CategoryTag } from './CategoryTag';
import { TodoList } from './TodoList';
import { AddTodoDialog } from './AddTodoDialog';
import { Sidebar } from './Sidebar';
import type { TabType } from './Sidebar';

interface MainContentProps {
  activeTab: TabType;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-[#f9f9f7] p-4 md:p-10">
      <header className="mb-6 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-center">
        <AddTodoDialog />

        <div className="flex flex-wrap justify-start gap-2 md:justify-end md:gap-3">
          <CategoryTag label="shopping" color="purple" />
          <CategoryTag label="business" color="pink" />
          <CategoryTag label="other things" color="orange" />
        </div>
      </header>

      <TodoList activeTab={activeTab} />
    </main>
  );
};
