import { createContext, useContext } from "react";

export const TodoContext = createContext({
    Todos: [
        {
            id: 1,
            todo: "Meet Radha on 16 Feb 2025",
            completed: false
        }
    ],
    addTodo: (todo) => { console.log("adding todo") },
    updateTodo: (id, todo) => { console.log("updating todo") },
    deleteTodo: (id) => { console.log("deleting todo") },
    toggleComplete: (id) => {}
});

export const TodoContextProvider = TodoContext.Provider

export const useTodos = () => useContext(TodoContext);