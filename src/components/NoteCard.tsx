import React from 'react';

interface NoteCardProps {
  title: string;
  content: string[];
  isList?: boolean;
  accentClass: string;
  isFavorite?: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  isList = false,
  accentClass,
  isFavorite = false,
}) => {
  return (
    <div className="flex min-h-[160px] overflow-hidden rounded-sm bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className={`w-4 shrink-0 ${accentClass}`}></div>
      <div className="flex-1 p-8">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-serif text-2xl leading-none font-bold text-gray-600">
            {title}
          </h3>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5fbcd3] text-white transition-colors hover:bg-[#4ea9bf]">
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
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#5fbcd3] transition-colors ${isFavorite ? 'bg-[#5fbcd3] text-white' : 'bg-white text-[#5fbcd3] hover:bg-[#5fbcd3]/10'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-gray-400">
          {isList ? (
            <ul className="list-inside list-disc space-y-1">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="italic">{content[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};
