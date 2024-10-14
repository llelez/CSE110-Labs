import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./hooksExercise";
import { themes } from "./themeContext"

function App() {
  
  const [notes,setNotes] = useState(dummyNotesList);
  

  const handleHeart = (changeNote:Note)=>{
    setNotes(notes=>
      notes.map(note => 
        note.id === changeNote.id ? {...note, favorite: !note.favorite} : note));
  };

  const [theme, setTheme] = useState(themes.light);
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light))
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
  })



  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.personal,
    favorite: false
  };

  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newNote = {
      ...createNote,
      id: notes.length + 1
    };

    setNotes((notes) => [...notes, newNote]);
    
    setCreateNote(initialNote);
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const deleteNoteHandler = (noteID: Note['id']) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id != noteID))
  }


  return (
   <div className='app-container' 
    style={{
    backgroundColor: theme.background,
    color: theme.foreground,
    margin: "20px",
    boxShadow: `0 0 0 20px ${theme.background}`,
    padding: 0
      }}>
      
        

      <form className="note-form" onSubmit={createNoteHandler} style={{border: "none"}}>
    	<div>
      	<input 
          id = "title"
        	placeholder="Note Title"
          value={createNote.title}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value})}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea 
          id= "content"
          style = {{width: "166px"}}
          value={createNote.content}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value})}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
        value={createNote.label}
       	onChange={(event) =>
         	setCreateNote({ ...createNote, 
            label: Label[event.target.value as keyof typeof Label] })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
    </div>
  

    	<div><button type="submit">Create Note</button></div>
  	</form>


      

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{backgroundColor:theme.notebackground}}
            >
            <div className="notes-header">
              <button onClick = {()=>handleHeart(note)}>{!note.favorite ? '🤍' : '❤️'}</button>
              <button onClick = {()=>deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2 contentEditable="true"> {note.title} </h2>
            <p contentEditable="true"> {note.content} </p>
            <p contentEditable="true"> {note.label} </p>
          </div>
        ))}
     </div>

     
     <div className="listFavorites">
     <button onClick = {()=>handleTheme()} style={{ width: '80px', height: '30px'}}>{theme === themes.light ? 'Light' : 'Dark'} </button>
      <p style={{ fontSize: '22px' , fontWeight: 'bold', fontFamily: 'serif', margin: '4px 0'}}>List Of Favorites: </p>
        {notes.map(
          (note) => 
            note.favorite && (
              <p style={{margin: '2px 0'}}>{note.title}</p>
            )
        )}
      {/* <ClickCounter /> */}
     </div>
   
   </div>

 );
}

export default App;

