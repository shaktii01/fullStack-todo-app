import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTodo, removeTodo }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Your Tasks 📋</h3>

      <div className="space-y-3 flex gap-[1vw] flex-wrap">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;