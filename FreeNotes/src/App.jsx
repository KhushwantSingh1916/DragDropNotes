import { useState, useEffect } from 'react';
import Notes from './components/notes';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      const defaultNote = {
        id: 1,
        text: "This is the first note",
        position: {
          x: Math.floor(Math.random() * (window.innerWidth - 250)),
          y: Math.floor(Math.random() * (window.innerHeight - 250))
        }
      };
      return [defaultNote];
    }
  });
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const determinePosition = () => {
    const x = Math.floor(Math.random() * (window.innerWidth - 250));
    const y = Math.floor(Math.random() * (window.innerHeight - 250));
    return { x, y };
  };

  const handleAddNote = () => {
    if (note.trim() === "") return; // Don't add empty notes
    
    const newNote = {
      id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
      text: note,
      position: determinePosition()
    };
    setNotes([...notes, newNote]);
    setNote("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className='relative flex justify-center items-start min-h-screen bg-linear-to-b from-[#BBC863] from-60% to-[#31694E] pt-24 overflow-hidden'>
    <div className="fixed inset-x-0 top-8 flex justify-center z-50">
      <form
        onSubmit={(e) => { e.preventDefault(); handleAddNote(); }}
        className="bg-[#d1c46c] backdrop-blur-sm shadow-md border-3 rounded-2xl px-4 py-3 flex items-center gap-3"
      >
        <input
          type="text"
          value={note}
          placeholder="Write a new note..."
          onChange={e => setNote(e.target.value)}
          className="w-80 md:w-96 px-4 py-2 border bg-[#BBC863] border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#31694E] shadow-sm"
        />
        <button
          type="submit"
          className="bg-[#BBC863] border  px-4 py-2 rounded-md shadow hover:bg-[#80bb6c]  transition-colors"
        >
          Add Note
        </button>
      </form>
    </div>
      <Notes notes={notes} setNotes={setNotes} onDelete={handleDeleteNote} />
    </div>
  );
}

export default App;