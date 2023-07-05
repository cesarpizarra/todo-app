import React, { useState } from "react";
import SunIcon from "../assets/icon-sun.svg";
import MoonIcon from "../assets/icon-moon.svg";

const TodoForm = ({ onModeToggle, isLightMode, onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTodo(newTodo);
    setNewTodo("");
  };

  const handleIconClick = () => {
    onModeToggle();
  };

  return (
    <div className="w-full max-w-[582px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-white text-center font-bold text-3xl md:text-4xl">
          TODO
        </h1>
        <div>
          <img
            src={isLightMode ? MoonIcon : SunIcon}
            alt={isLightMode ? "Moon icon" : "Sun icon"}
            onClick={handleIconClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* form for todo list */}
      <form onSubmit={handleSubmit} className="w-full px-4 pt-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 border border-gray-600 rounded-full w-6 h-6"></span>
          <input
            type="text"
            placeholder="Create new todo..."
            value={newTodo}
            onChange={handleInputChange}
            className={`w-full bg-[#222C38] outline-none p-4   rounded-md pl-14 ${
              isLightMode
                ? "bg-white text-black caret-black"
                : "text-gray-400 caret-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
