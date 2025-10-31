import { useState } from 'react';
import Notes from './components/notes';

function App() {
  const [notes,setNotes]=useState([
    {id:1,
    text:"This is the first note"},
    {id:2,
    text:"This is the second note"},
  ]);

  const [note,setNote]=useState("")

  return (
    <div>
      <div>
        <input type="text" value={note} placeholder="New note text" onChange={e=> setNote(e.target.value)} />
        <button onClick={()=>{ setNotes([...notes,{id:notes.length, text: note}])
        setNote("")}}>Add Note</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  )
 
}

export default App
