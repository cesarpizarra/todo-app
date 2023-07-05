import React, { useState, useEffect } from "react";
import check from "../assets/icon-check.svg";

const TodoItems = ({ isLightMode, todos, setTodos }) => {
  const [checkIcons, setCheckIcons] = useState(todos.map(() => false));
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCheckIcons = localStorage.getItem("checkIcons");
    if (storedTodos && storedCheckIcons) {
      setTodos(JSON.parse(storedTodos));
      setCheckIcons(JSON.parse(storedCheckIcons));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("checkIcons", JSON.stringify(checkIcons));
  }, [todos, checkIcons]);

  const handleCheckToggle = (index) => {
    const updatedCheckIcons = [...checkIcons];
    updatedCheckIcons[index] = !updatedCheckIcons[index];
    setCheckIcons(updatedCheckIcons);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter((_, index) => !checkIcons[index]);
    const updatedCheckIcons = checkIcons.filter(
      (_, index) => !checkIcons[index]
    );
    setCheckIcons(updatedCheckIcons);
    setTodos(updatedTodos);
  };

  const getItemsLeftCount = () => {
    const checkedCount = checkIcons.filter((icon) => icon).length;
    return todos.length - checkedCount;
  };

  const filteredTodos = todos.filter((item, index) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !checkIcons[index];
    } else if (filter === "completed") {
      return checkIcons[index];
    }
    return true;
  });

  return (
    <div
      className={`w-full max-w-[582px] mx-auto px-4 pt-8 pb-16 flex-grow ${
        isLightMode ? "bg-white text-gray-700" : "text-gray-400"
      }`}
    >
      <div
        className={`bg-[#222C38] w-full rounded-md ${
          isLightMode ? "bg-white text-gray-700 shadow-xl" : "text-gray-400"
        }`}
      >
        {filteredTodos.map((item, index) => (
          <div className="flex items-center py-4 px-5" key={item.id}>
            <button
              onClick={() => handleCheckToggle(index)}
              className={`border border-gray-600 rounded-full w-6 h-6 cursor-pointer ${
                checkIcons[index] && filter !== "active" ? "active-btn" : ""
              }`}
            >
              {checkIcons[index] && filter !== "active" && (
                <div className="flex items-center justify-center  h-6 w-6 rounded-full check-btn">
                  <img className="w-[20px]" src={check} alt="Check icon" />
                </div>
              )}
            </button>

            <p
              className={`ml-7 ${
                checkIcons[index] && filter !== "active" ? "line-through" : ""
              }`}
            >
              {item.todos}
            </p>
          </div>
        ))}

        <div
          className={`text-gray-400 text-sm rounded-md shadow-lg bg-[#222C38] flex items-center justify-between py-4 px-5 ${
            isLightMode ? "bg-white text-gray-700" : ""
          }`}
        >
          <p className="font-thin">
            {getItemsLeftCount()} item{getItemsLeftCount() !== 1 && "s"} left
          </p>
          <div className="hidden lg:flex">
            <button
              className={filter === "all" ? "mr-4 text-blue-500" : "mr-4"}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "mr-4 text-blue-500" : "mr-4"}
              onClick={() => handleFilterChange("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "mr-4 text-blue-500" : "mr-4"}
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
          </div>
          <div>
            <button
              className={` duration-300 transition ${
                isLightMode ? "hover:text-gray-600" : "hover:text-white"
              } `}
              onClick={handleClearCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex lg:hidden text-gray-400 text-sm shadow-lg rounded-md bg-[#222C38]  items-center justify-center py-4 px-5 mt-4  ${
          isLightMode ? "bg-white text-gray-800" : ""
        }`}
      >
        <button
          className={filter === "all" ? "mr-4 text-blue-500" : "mr-4"}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "mr-4 text-blue-500" : "mr-4"}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "mr-4 text-blue-500" : "mr-4"}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoItems;
