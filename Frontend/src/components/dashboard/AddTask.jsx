import { useState } from "react";

const AddTask = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title) return;

    addTodo({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-6 flex flex-col gap-3">

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        className="p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
      />

      <button
        onClick={handleAdd}
        className="py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;