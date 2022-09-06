import { useRef } from "react";

export default function Card({
  color,
  id,
  date,
  text,
  updateNote,
  deleteNote,
  setNotes,
}) {
  const textRef = useRef(null);

  function handleDelete() {
    deleteNote(id);
    setNotes((notes) => notes.filter((note) => note.noteId !== id));
  }

  return (
    <div
      className="w-full sm:w-80 md:w-96 h-auto rounded-3xl drop-shadow-lg p-4 md:p-5 text-black"
      style={{ backgroundColor: color }}
    >
      <textarea
        ref={textRef}
        className="scrollbar w-full h-32 md:h-44 border-none bg-transparent focus:outline-none resize-none text-left"
        placeholder="Write here..."
      >
        {text}
      </textarea>
      <footer className="flex justify-between items-center">
        <div className="text-sm md:text-base">{date}</div>
        <div className="space-x-4 inline-flex">
          <button
            onClick={() => updateNote(id, textRef.current.value)}
            className="bg-black hover:opacity-80 focus:opacity-95 text-white text-sm md:text-base rounded-full px-4 py-1"
          >
            Save
          </button>
          <button
            onClick={() => handleDelete()}
            className="bg-black text-white rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
