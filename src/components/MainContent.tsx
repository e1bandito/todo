import React, { useEffect, useState, useMemo } from 'react';
import { CategoryTag } from './CategoryTag';
import { TodoList } from './TodoList';
import { IconButton } from './IconButton';
import { TodoDialog, type Todo } from './TodoDialog';
import type { TabType } from './Sidebar';

interface MainContentProps {
  activeTab: TabType;
  searchQuery: string;
}

const API_URL = 'https://690ef084bd0fefc30a062073.mockapi.io/todos';

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 60%)`;
};

export const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  searchQuery,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();

    const handleRefresh = () => fetchTodos();
    window.addEventListener('todo-added', handleRefresh);
    window.addEventListener('todo-updated', handleRefresh);
    return () => {
      window.removeEventListener('todo-added', handleRefresh);
      window.removeEventListener('todo-updated', handleRefresh);
    };
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    todos.forEach((todo) => {
      todo.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [todos]);

  const tagToColor = useMemo(() => {
    const mapping: Record<string, string> = {};
    allTags.forEach((tag) => {
      mapping[tag] = stringToColor(tag);
    });
    return mapping;
  }, [allTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const handleAdd = () => {
    setSelectedTodo(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDialogOpen(true);
  };

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (activeTab === 'trash') {
      result = result.filter((t) => t.isDeleted);
    } else if (activeTab === 'favorites') {
      result = result.filter((t) => t.isFavorite && !t.isDeleted);
    } else {
      result = result.filter((t) => !t.isDeleted);
    }

    if (selectedTags.length > 0) {
      result = result.filter((t) =>
        t.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.text.toLowerCase().includes(query)
      );
    }

    return result;
  }, [todos, activeTab, selectedTags, searchQuery]);

  const updateTodoInState = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  };

  const removeTodoFromState = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
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

        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end md:gap-3">
          {allTags.map((tag) => (
            <CategoryTag
              key={tag}
              label={tag}
              color={tagToColor[tag]}
              isActive={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearFilters}
              className="cursor-pointer text-xs font-medium text-gray-400 underline underline-offset-2 hover:text-gray-600"
            >
              Clear all
            </button>
          )}
        </div>
      </header>

      <TodoList
        todos={filteredTodos}
        loading={loading}
        error={error}
        activeTab={activeTab}
        tagToColor={tagToColor}
        onEdit={handleEdit}
        onUpdate={updateTodoInState}
        onDeletePermanent={removeTodoFromState}
      />

      <TodoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedTodo}
      />
    </main>
  );
};
