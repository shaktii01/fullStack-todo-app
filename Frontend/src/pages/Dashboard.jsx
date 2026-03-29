import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import StatsSection from "../components/dashboard/StatsSection";
import AddTask from "../components/dashboard/AddTask";
import TaskList from "../components/dashboard/TaskList";
import useTodos from "../hooks/useTodos";

const Dashboard = () => {

  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">

      <Sidebar />

      <div className="flex-1 p-10">
        <Header />

        <StatsSection tasks={todos} />

        <AddTask addTodo={addTodo} />

        <TaskList
          tasks={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      </div>

    </div>
  );
};

export default Dashboard;