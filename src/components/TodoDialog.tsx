import React, { useEffect, useRef, useState } from 'react';

export interface Todo {
  id: string;
  createdAt: string;
  tags: string[];
  title: string;
  text: string;
  isFavorite: boolean;
  isDeleted: boolean;
}

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Todo | null;
  onSuccess?: () => void;
}

export const TodoDialog: React.FC<TodoDialogProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tags: '',
  });

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      if (initialData) {
        setFormData({
          title: initialData.title,
          text: initialData.text,
          tags: initialData.tags.join(', '),
        });
      } else {
        setFormData({ title: '', text: '', tags: '' });
      }
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const todoData = {
      title: formData.title,
      text: formData.text,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t !== ''),
      isFavorite: initialData?.isFavorite ?? false,
      isDeleted: initialData?.isDeleted ?? false,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    };

    const API_URL = 'https://690ef084bd0fefc30a062073.mockapi.io/todos';
    const url = initialData?.id ? `${API_URL}/${initialData.id}` : API_URL;
    const method = initialData?.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      });

      if (!response.ok)
        throw new Error(`Failed to ${initialData ? 'update' : 'add'} todo`);

      onClose();
      if (onSuccess) {
        onSuccess();
      } else if (!initialData) {
        window.dispatchEvent(new CustomEvent('todo-added'));
      } else {
        window.dispatchEvent(new CustomEvent('todo-updated'));
      }
    } catch (err) {
      console.error(err);
      alert(`Error ${initialData ? 'updating' : 'adding'} todo`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="open:animate-fade-in m-auto w-full max-w-md rounded-lg border-none bg-white p-0 shadow-2xl backdrop:bg-black/50"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-gray-700">
            {initialData ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Title
            </label>
            <input
              required
              type="text"
              className="w-full rounded-md border border-gray-200 px-4 py-2 focus:border-[#5fbcd3] focus:ring-1 focus:ring-[#5fbcd3] focus:outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Text
            </label>
            <textarea
              required
              className="min-h-[100px] w-full rounded-md border border-gray-200 px-4 py-2 focus:border-[#5fbcd3] focus:ring-1 focus:ring-[#5fbcd3] focus:outline-none"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              placeholder="Description..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-200 px-4 py-2 focus:border-[#5fbcd3] focus:ring-1 focus:ring-[#5fbcd3] focus:outline-none"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="work, personal, urgent"
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md px-6 py-2 text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-[#5fbcd3] px-6 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? initialData
                  ? 'Saving...'
                  : 'Adding...'
                : 'Save Todo'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
