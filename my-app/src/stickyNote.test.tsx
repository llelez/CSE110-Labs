// import { render, screen, fireEvent } from "@testing-library/react";
// import { StickyNotes } from "./stickyNotes";
// test("renders create note form", () => {
//  render(<StickyNotes />);
//  const createNoteButton = screen.getByText("Create Note");
//  expect(createNoteButton).toBeInTheDocument();
// });

import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constant";
import React, { useState, useEffect } from 'react';


describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("read notes", () => {
    render(<StickyNotes />);
    // dummyNotesList.forEach(note => {
    //     expect(screen.getAllByText(note.content)).toBeInTheDocument() 
    // })
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New NOTE" } });

    fireEvent.change(createNoteContentTextarea, { target: { value: "Note CONTENT" } });

    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New NOTE");  
    const newNoteContent = screen.getByText("Note CONTENT");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    fireEvent.change(createNoteTitleInput, { target: { value: "New NOTE 2" } });

    fireEvent.change(createNoteContentTextarea, {
    target: { value: "Note CONTENT 2" },
  });

   fireEvent.click(createNoteButton);

   const newNoteTitle2 = screen.getByText("New NOTE 2");
   const newNoteContent2 = screen.getByText("Note CONTENT 2");

   expect(newNoteTitle2).toBeInTheDocument();
   expect(newNoteContent2).toBeInTheDocument();


 });

 test("Update", () => {
    render(<StickyNotes />);
    // fireEvent.change(dummyNotesList[0].title, {target: { value: "New NOTE 2" }})

    
    const newNoteTitle = screen.getByText("test note 1 title");
    fireEvent.click(newNoteTitle);
    fireEvent.input(newNoteTitle, {target: {textContent: "new test note 1 title"}});
    expect(newNoteTitle.textContent).toBe('new test note 1 title');
    


 });


 describe("delete sticky note", () => {
    test("delete all sticky notes", () => {
    render(<StickyNotes />);
      
    const deleteButtons = screen.getAllByText("x");
    console.log("number of buttons",deleteButtons.length);
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });

    const remainingNotes = screen.queryAllByText(/test note \d+ title/i);
    expect(remainingNotes.length).toBe(0); // All notes should be removed
    });
  });
  
  test("click heart", () => {
    render(<StickyNotes />);
    const clickHeart = screen.getAllByText("🤍");
    clickHeart.forEach(heart => {
      fireEvent.click(heart);
    });
    const remainingNotes = screen.queryAllByText("🤍");
    expect(remainingNotes.length).toBe(0);

  })

});