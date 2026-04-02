import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  RotateCcw,
  Pencil,
  Trash2,
  Save,
  X,
  ClipboardList,
} from "lucide-react";
import { getTodos, updateTodo, deleteTodo } from "@/api/todoApi";

const RecentTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      console.log("getTodos response:", res);

      const taskList = Array.isArray(res) ? res : res?.data || [];
      setTasks(taskList.slice().reverse());
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleToggleComplete = async (taskItem) => {
    try {
      const updatedPayload = {
        title: taskItem.title,
        description: taskItem.description,
        completed: !taskItem.completed,
      };

      const res = await updateTodo(taskItem._id, updatedPayload);
      console.log("updateTodo response:", res);

      const updatedTask =  res.data;

      setTasks((prev) =>
        prev.map((item) => (item._id === taskItem._id ? updatedTask : item))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleEditClick = (taskItem) => {
    setEditingTaskId(taskItem._id);
    setEditData({
      title: taskItem.title || "",
      description: taskItem.description || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditData({
      title: "",
      description: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveUpdate = async (id, oldTask) => {
    if (!editData.title.trim() || !editData.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const updatedPayload = {
        title: editData.title,
        description: editData.description,
        completed: oldTask.completed,
      };

      const res = await updateTodo(id, updatedPayload);
      console.log("save update response:", res);

      const updatedTask =  res?.data || res;

      setTasks((prev) =>
        prev.map((item) => (item._id === id ? updatedTask : item))
      );

      setEditingTaskId(null);
      setEditData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to update task");
    }
  };

  return (
    <div className="w-full mt-[1vw] rounded-3xl border border-white/10 bg-[#0f0f10] p-6 shadow-2xl">
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
          <ClipboardList size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">My Tasks</h2>
          <p className="text-sm text-gray-400">
            Manage your tasks with update, complete, undo, and delete actions
          </p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-gray-400">
          Loading tasks...
        </div>
      ) : tasks.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {tasks.map((taskItem) => {
            const isEditing = editingTaskId === taskItem._id;

            return (
              <div
                key={taskItem._id}
                className="rounded-3xl border w-[49%] border-white/10 bg-white/[0.03] p-5 shadow-lg transition hover:bg-white/[0.05]"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-blue-500/40"
                        placeholder="Enter task name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        value={editData.description}
                        onChange={handleEditChange}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-blue-500/40"
                        placeholder="Enter task description"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSaveUpdate(taskItem._id, taskItem)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                      >
                        <Save size={16} />
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className={`inline-block h-3 w-3 rounded-full ${taskItem.completed ? "bg-green-400" : "bg-yellow-400"
                              }`}
                          />
                          <span className="text-xs uppercase tracking-wider text-gray-400">
                            {taskItem.completed ? "Completed" : "In Progress"}
                          </span>
                        </div>

                        <h3
                          className={`break-words text-xl font-semibold ${taskItem.completed
                            ? "text-gray-500 line-through"
                            : "text-white"
                            }`}
                        >
                          {taskItem.title}
                        </h3>

                        <p
                          className={`mt-2 break-words text-sm leading-6 ${taskItem.completed
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                        >
                          {taskItem.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(taskItem)}
                        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${taskItem.completed
                          ? "bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500/25"
                          : "bg-green-500/15 text-green-300 hover:bg-green-500/25"
                          }`}
                      >
                        {taskItem.completed ? (
                          <>
                            <RotateCcw size={16} />
                            Undo
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} />
                            Complete Task
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEditClick(taskItem)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-blue-500/15 px-4 py-2.5 text-sm font-medium text-blue-300 transition hover:bg-blue-500/25"
                      >
                        <Pencil size={16} />
                        Update
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(taskItem._id)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/25"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-gray-400">No tasks found.</p>
        </div>
      )}
    </div>
  );
};

export default RecentTask;