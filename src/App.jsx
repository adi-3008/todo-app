import { useState } from 'react';
import { TodoContextProvider } from './context/index';
import { useEffect } from 'react';
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';

function App() {

  const [todo, setTodos] = useState([]);

  const addTodo = (newtodo) => {
    setTodos((prev) => [{id: Date.now(), ...newtodo}, ...prev]);
  }

  const updateTodo = (id, newtodo) => {
    setTodos((prev) => prev.map((element) => element.id === id ? newtodo : element));
  };
  
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(element => element.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id) ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length){
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo])

  return <TodoContextProvider value={{todo, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todo.map((t) => 
                <TodoItem 
                  key={t.id}
                  todoprop={t}
                />
              )
            }
          </div>
      </div>
    </div>
  </TodoContextProvider>
}

export default App