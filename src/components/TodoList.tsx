import React, { useEffect, useState } from 'react';
import { NoteCard } from './NoteCard';

interface Todo {
  id: string;
  createdAt: string;
  tags: string[];
  title: string;
  text: string;
  isFavorite: boolean;
  isDeleted: boolean;
}

const ACCENT_COLORS = [
  'bg-[#a28ed4]', // purple
  'bg-[#ec9f73]', // orange
  'bg-[#5fbcd3]', // light blue
  'bg-[#ef9db3]', // pink
];

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://690ef084bd0fefc30a062073.mockapi.io/todos';

  useEffect(() => {
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

    fetchTodos();

    const handleAdded = () => fetchTodos();
    window.addEventListener('todo-added', handleAdded);
    return () => window.removeEventListener('todo-added', handleAdded);
  }, []);

  const handleToggleFavorite = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const newFavoriteStatus = !todo.isFavorite;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isFavorite: newFavoriteStatus } : t
      )
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: newFavoriteStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
    } catch (err) {
      console.error(err);
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isFavorite: todo.isFavorite } : t
        )
      );
    }
  };

  const handleToggleDelete = async (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDeleted: true } : todo))
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (err) {
      console.error(err);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDeleted: false } : todo
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading todos...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  const activeTodos = todos.filter((todo) => !todo.isDeleted);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      {activeTodos.map((todo, index) => (
        <NoteCard
          key={todo.id}
          title={todo.title}
          content={[todo.text]}
          isList={todo.tags.length > 0}
          accentClass={ACCENT_COLORS[index % ACCENT_COLORS.length]}
          isFavorite={todo.isFavorite}
          onDelete={() => handleToggleDelete(todo.id)}
          onToggleFavorite={() => handleToggleFavorite(todo.id)}
        />
      ))}
    </div>
  );
};
