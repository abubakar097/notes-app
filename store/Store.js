import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const notesStore = (set) => ({
  notes: [],
  addNote: (note) => {
    set((state) => ({
      notes: [note, ...state.notes],
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.noteId !== id),
    }));
  },
  updateNote: (noteId, data) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.noteId === noteId) {
          return {
            ...note,
            text: data,
          };
        } else {
          return note;
        }
      }),
    }));
  },
});

const useStore = create(
  devtools(
    persist(notesStore, {
      name: "notes",
    })
  )
);

export default useStore;
