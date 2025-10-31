import { useState } from 'react';
import Notes from './components/notes';

function App() {
  const [notes,setNotes]=useState([
    {id:1,
    text:"This is the first note"},
    {id:2,
    text:"This is the second note"},
  ]);

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  )
 
}

export default App
