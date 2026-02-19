import React, { useRef, useState } from 'react';
import { IconButton } from './IconButton';

interface AddTodoDialogProps {
  onTodoAdded?: () => void;
}

export const AddTodoDialog: React.FC<AddTodoDialogProps> = ({
  onTodoAdded,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tags: '',
  });

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => {
    dialogRef.current?.close();
    setFormData({ title: '', text: '', tags: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newTodo = {
      title: formData.title,
      text: formData.text,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t !== ''),
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        'https://690ef084bd0fefc30a062073.mockapi.io/todos',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTodo),
        }
      );

      if (!response.ok) throw new Error('Failed to add todo');

      closeDialog();
      if (onTodoAdded) {
        onTodoAdded();
      } else {
        window.dispatchEvent(new CustomEvent('todo-added'));
      }
    } catch (err) {
      console.error(err);
      alert('Error adding todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={openDialog}
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

      <dialog
        ref={dialogRef}
        className="open:animate-fade-in m-auto w-full max-w-md rounded-lg border-none bg-white p-0 shadow-2xl backdrop:bg-black/50"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-gray-700">
              Add New Todo
            </h2>
            <button
              onClick={closeDialog}
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
                onClick={closeDialog}
                className="cursor-pointer rounded-md px-6 py-2 text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-[#5fbcd3] px-6 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Save Todo'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
