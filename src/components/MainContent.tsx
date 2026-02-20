import React, { useState } from 'react';
import { CategoryTag } from './CategoryTag';
import { TodoList } from './TodoList';
import { IconButton } from './IconButton';
import { TodoDialog, type Todo } from './TodoDialog';
import type { TabType } from './Sidebar';

interface MainContentProps {
  activeTab: TabType;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleAdd = () => {
    setSelectedTodo(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDialogOpen(true);
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-[#f9f9f7] p-4 md:p-10">
      <header className="mb-6 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-center">
        <IconButton
          onClick={handleAdd}
          className="h-10 w-10 bg-[#5fbcd3] text-white shadow-md hover:scale-110 active:scale-95"
          ariaLabel="Add new todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </IconButton>

        <div className="flex flex-wrap justify-start gap-2 md:justify-end md:gap-3">
          <CategoryTag label="shopping" color="purple" />
          <CategoryTag label="business" color="pink" />
          <CategoryTag label="other things" color="orange" />
        </div>
      </header>

      <TodoList activeTab={activeTab} onEdit={handleEdit} />

      <TodoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedTodo}
      />
    </main>
  );
};
