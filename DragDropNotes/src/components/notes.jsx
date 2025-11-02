import React, { useRef, createRef } from 'react';
import Note from './note.jsx';

function Notes({ notes = [], setNotes = () => {} }) {
  const noteRefs = useRef({});

  const handleDrag = (note, e) => {
    const { id } = note;
    const noteRef = noteRefs.current[id];
    if (!noteRef?.current) return;

    const rect = noteRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.current.style.left = `${newX}px`;
      noteRef.current.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const finalRect = noteRef.current.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id)) {
        noteRef.current.style.left = `${note.position.x}px`;
        noteRef.current.style.top = `${note.position.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentNoteRef = noteRefs.current[id];
    const rect = currentNoteRef.current.getBoundingClientRect();
    return notes.some(note => {
      if (note.id === id) return false;
      const otherNoteRef = noteRefs.current[note.id];
      if (!otherNoteRef?.current) return false;
      const otherRect = otherNoteRef.current.getBoundingClientRect();
      return !(
        rect.right < otherRect.left ||
        rect.left > otherRect.right ||
        rect.bottom < otherRect.top ||
        rect.top > otherRect.bottom
      );
    });
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div>
      {notes.map(note => {
        if (!noteRefs.current[note.id]) {
          noteRefs.current[note.id] = createRef();
        }

        return (
          <Note
            key={note.id}
            ref={noteRefs.current[note.id]}
            initialPos={note.position}
            content={note.text}
            onMouseDown={(e) => handleDrag(note, e)}
          />
        );
      })}
    </div>
  );
}

export default Notes;