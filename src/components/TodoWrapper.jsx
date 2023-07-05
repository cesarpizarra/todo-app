import React, { useState } from "react";
import BgImageDark from "../assets/bg-desktop-dark.jpg";
import BgImageLight from "../assets/bg-desktop-light.jpg";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import { v4 as uuid } from "uuid";

const TodoWrapper = () => {
  const [isLightMode, setLightMode] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleModeToggle = () => {
    setLightMode(!isLightMode);
  };

  const handleAddTodo = (newTodo) => {
    const todoItem = {
      todos: newTodo,
      id: uuid(),
    };

    setTodos((prevTodos) => [...prevTodos, todoItem]);
    console.log(todoItem);
  };

  const bgImage = isLightMode ? BgImageLight : BgImageDark;

  return (
    <div
      className={`transition duration-300 bg-[#1C2029] text-white min-h-screen flex flex-col ${
        isLightMode ? "bg-white" : ""
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto flex-grow">
        <div className="relative">
          <img
            src={bgImage}
            alt="Background Image"
            className="w-full object-cover h-64 block transition duration-300"
          />
          <TodoForm
            onModeToggle={handleModeToggle}
            isLightMode={isLightMode}
            onAddTodo={handleAddTodo}
          />
        </div>
        <div className="overflow-y-auto">
          <TodoItems
            isLightMode={isLightMode}
            todos={todos}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoWrapper;
