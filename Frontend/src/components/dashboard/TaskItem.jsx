import React from "react";

const TaskItem = ({ task, toggleTodo, removeTodo }) => {

  if (!task) return null;

  const handleToggle = () => {
    toggleTodo(task);
  };

  const handleDelete = () => {
    removeTodo(task._id);
  };

  return (
    <div className="flex w-[24%] justify-between items-center bg-gray-900/60 p-4 rounded-xl border border-white/5 hover:border-white/10 transition">

      <div className="flex flex-col">

        <span
          onClick={handleToggle}
          className={`cursor-pointer text-[1.5vw] font-medium transition ${
            task.completed
              ? "line-through text-gray-400"
              : "text-white"
          }`}
        >
          {task.title || "Untitled Task"}
        </span>

        {task.description && (
          <span className="text-[1vw] text-gray-500 mt-1">
            {task.description}
          </span>
        )}

      </div>

      <div className="flex items-center gap-4">

        
        <button
          onClick={handleToggle}
          className={`text-sm px-3 py-1 rounded-lg transition ${
            task.completed
              ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
              : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
          }`}
        >
          {task.completed ? "Undo" : "Done"}
        </button>

     
        <button
          onClick={handleDelete}
          className="text-sm px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default TaskItem;