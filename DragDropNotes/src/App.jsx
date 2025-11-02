import { useState, useEffect } from 'react';
import Notes from './components/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // If no saved notes, create a default first note
      const defaultNote = {
        id: 1,
        text: "This is the first note",
        position: determinePosition()
      };
      setNotes([defaultNote]);
      localStorage.setItem("notes", JSON.stringify([defaultNote]));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
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
    <div>
      <div style={{ padding: '20px', position: 'fixed', top: 0, left: 0, zIndex: 1000, background: 'white' }}>
        <input 
          type="text" 
          value={note} 
          placeholder="New note text" 
          onChange={e => setNote(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAddNote()}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} onDelete={handleDeleteNote} />
    </div>
  );
}

export default App;