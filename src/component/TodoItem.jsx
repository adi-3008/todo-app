import { useEffect, useState } from "react";
import { useTodos } from "../context";

function TodoItem({ todoprop }) {
    
    const { updateTodo, deleteTodo, toggleComplete } = useTodos();
    const [todoValue, setTodoValue] = useState(todoprop.todo);
    const [isTodoEditable, setIsTodoEditable] = useState(false);

    return (
        <div
            className={`w-full flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todoprop.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todoprop.completed}
                onChange={(e) => {
                    toggleComplete(todoprop.id)
                }}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todoprop.completed ? "line-through" : ""}`}
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={(e) => {
                    if (todoprop.completed) return;
                    if(isTodoEditable){
                        updateTodo(todoprop.id, {...todoprop, todo: todoValue});
                    }
                    setIsTodoEditable((prev) => !prev);
                }}
                disabled={todoprop.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => deleteTodo(todoprop.id)}
                disabled={todoprop.completed}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
