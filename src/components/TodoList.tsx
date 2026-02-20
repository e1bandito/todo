import React, { useEffect, useState } from 'react';
import { NoteCard } from './NoteCard';
import { TodoDialog, type Todo } from './TodoDialog';
import type { TabType } from './Sidebar';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  activeTab: TabType;
  onEdit: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onDeletePermanent: (id: string) => void;
}

const ACCENT_COLORS = [
  'bg-[#a28ed4]', // purple
  'bg-[#ec9f73]', // orange
  'bg-[#5fbcd3]', // light blue
  'bg-[#ef9db3]', // pink
];

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  error,
  activeTab,
  onEdit,
  onUpdate,
  onDeletePermanent,
}) => {
  const API_URL = 'https://690ef084bd0fefc30a062073.mockapi.io/todos';

  const handleToggleFavorite = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const newFavoriteStatus = !todo.isFavorite;
    const updatedTodo = { ...todo, isFavorite: newFavoriteStatus };

    onUpdate(updatedTodo);

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
      onUpdate(todo);
    }
  };

  const handleToggleDelete = async (id: string) => {
    const isTrashTab = activeTab === 'trash';
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    if (isTrashTab) {
      onDeletePermanent(id);

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete todo permanently');
        }
      } catch (err) {
        console.error(err);
        onUpdate(todo);
      }
    } else {
      const updatedTodo = { ...todo, isDeleted: true };
      onUpdate(updatedTodo);

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isDeleted: true }),
        });

        if (!response.ok) {
          throw new Error('Failed to move todo to trash');
        }
      } catch (err) {
        console.error(err);
        onUpdate(todo);
      }
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

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      {todos.length === 0 ? (
        <div className="p-8 text-center text-gray-400 italic">
          No notes found
        </div>
      ) : (
        todos.map((todo, index) => (
          <NoteCard
            key={todo.id}
            title={todo.title}
            content={[todo.text]}
            isList={todo.tags.length > 0}
            accentClass={ACCENT_COLORS[index % ACCENT_COLORS.length]}
            isFavorite={todo.isFavorite}
            onClick={() => onEdit(todo)}
            onDelete={() => handleToggleDelete(todo.id)}
            onToggleFavorite={() => handleToggleFavorite(todo.id)}
          />
        ))
      )}
    </div>
  );
};
