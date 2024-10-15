import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constant";
import { useParams } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("number of items checked", () => {
    test("number of items checked", () => {
        render(<ToDoList />);
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach((checkbox) => {
        fireEvent.click(checkbox); 
    });

    const numChecked = screen.queryAllByRole('checkbox', { checked: true });
    
    const numDisplayedElement = screen.getByText(/Items bought: \d/);
    const match = numDisplayedElement?.textContent?.match(/\d+/);
    
    if (match && match[0]) {
        const numDisplayed = parseInt(match[0], 10); // Parse the matched number
        expect(numChecked.length).toBe(numDisplayed); 
      } 
    });
  });


  test("Read items", () => {
    render(<ToDoList/>);

    dummyGroceryList.forEach(grocery => {
        expect(screen.getByText(grocery.name)).toBeInTheDocument() 
    })

  });