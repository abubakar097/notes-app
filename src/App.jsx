import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import useStore from "../store/Store";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const addNote = useStore((state) => state.addNote);
  const savedNotes = useStore((state) => state.notes);
  const deleteNote = useStore((state) => state.deleteNote);
  const updateNote = useStore((state) => state.updateNote);

  useEffect(() => {
    if (savedNotes.length > 0) setNotes(savedNotes);
  }, [notes]);

  function addNewNote(color) {
    const id = new Date().getTime();
    addNote({
      noteId: id,
      color: color,
      date: new Date().toLocaleDateString(),
      text: "",
    });
    setNotes((notes) => [
      ...notes,
      {
        noteId: id,
        color: color,
        date: new Date().toLocaleString(),
        text: "",
      },
    ]);
    setVisible(false);
  }
  const colors = [
    "F7ECDE",
    "#FF9F4A",
    "#FED54A",
    "#E1A2B8",
    "#1B98F5",
    "#50DBB4",
    "#35BDD0",
    "#CAD5E2",
    "#EDBF69",
  ];

  return (
    <div>
      <main className="pt-20 md:pt-10">
        <aside className="fixed top-0 left-0 flex flex-col items-start md:items-center justify-start w-full h-16 md:h-screen md:w-40 border-b-2 md:border-r-2 border-gray-200">
          <div className="hidden md:block text-base md:text-2xl font-bold my-6 md:my-10">
            Notes
          </div>
          <div className="mt-3 ml-2 md:mt-0 md:ml-0 flex flex-row md:flex-col items-start md:items-center md:justify-center md:gap-5">
            <button
              onClick={() => setVisible(!visible)}
              className="h-8 w-8 md:h-12 md:w-12 flex items-center justify-center bg-black text-white rounded-full drop-shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  visible && "rotate-45"
                } h-5 w-5 md:h-7 md:w-7 transition-transform delay-75 ease-in-out duration-200`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            {visible && (
              <div className="md:space-y-4 flex flex-row md:flex-col space-x-2 md:space-x-0 space-y-1">
                {colors.map((color, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        ease: "easeInOut",
                        delay: index * 0.1,
                      },
                    }}
                    key={index}
                    className={`w-3 h-3 p-3 rounded-full cursor-pointer`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      addNewNote(color);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>
        <section className="px-2 md:pl-56 flex flex-wrap gap-5 md:gap-10">
          {notes &&
            notes.map((note, index) => (
              <Card
                color={note.color}
                key={note.noteId}
                id={note.noteId}
                date={note.date}
                text={note.text}
                updateNote={updateNote}
                deleteNote={deleteNote}
                setNotes={setNotes}
              />
            ))}
        </section>
      </main>
    </div>
  );
}
