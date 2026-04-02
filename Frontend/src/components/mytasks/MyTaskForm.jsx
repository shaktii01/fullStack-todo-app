import React, { useState } from "react";
import { PlusCircle, FileText, AlignLeft } from "lucide-react";
import { createTodo } from "@/api/todoApi";

const MyTaskForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await createTodo(formData);

            alert("Task created successfully");

            setFormData({
                title: '',
                description: "",
            });
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111111] shadow-2xl overflow-hidden">
            <div className="border-b border-white/10 px-8 py-6 bg-white/[0.03]">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <PlusCircle size={22} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-white">Add New Task</h3>
                        <p className="text-sm text-gray-400">
                            Create a task with title and description
                        </p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="m-6 flex flex-col gap-6 rounded-3xl border border-dashed border-white/10 bg-zinc-900/70 p-6 text-white"
            >
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                    >
                        <FileText size={16} className="text-gray-400" />
                        Task Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter your task name"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
                    >
                        <AlignLeft size={16} className="text-gray-400" />
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500/40 focus:bg-white/10"
                    />
                </div>

                <div className="flex items-center justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] disabled:opacity-50"
                    >
                        <PlusCircle size={18} />
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyTaskForm;