import Sidebar from "@/components/dashboard/Sidebar";
import useTodos from "@/hooks/useTodos";
import { Outlet,  } from "react-router-dom";
const DashboardPage = () => {

  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;