import React, { useEffect, useState } from 'react';
import { NoteCard } from './NoteCard';

interface Todo {
  id: string;
  createdAt: string;
  tags: string[];
  title: string;
  text: string;
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

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          'https://690ef084bd0fefc30a062073.mockapi.io/todos'
        );
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
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading todos...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      {todos.map((todo, index) => (
        <NoteCard
          key={todo.id}
          title={todo.title}
          content={[todo.text]}
          isList={todo.tags.length > 0}
          accentClass={ACCENT_COLORS[index % ACCENT_COLORS.length]}
          isFavorite={index % 3 === 0}
        />
      ))}
    </div>
  );
};
