import React, { useState } from 'react';
import { useTodo } from '../contexts';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa'; // Importing icons

function TodoItem({ todo }) {
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo); // Destructured todo text

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg }); // Set to previous text
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`bg-grey p-2 pl-4 pr-4 rounded-lg shadow-md flex border gap-x-3 shadow-white/10 duration-300 text-black ${
                todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer w-7"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg pl-6 ${
                    isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
                } ${todo.completed ? 'line-through text-gray-400' : ''}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <FaSave className='fill-sky-700'/> : <FaEdit className='fill-sky-700' />}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8  rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                <FaTrash className=' fill-red-500'/>
            </button>
        </div>
    );
}

export default TodoItem;
