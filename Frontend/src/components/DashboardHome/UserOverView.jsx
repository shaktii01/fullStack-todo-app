import React, { useEffect, useState } from 'react'
import { getTodos } from '@/api/todoApi'
import { Link } from 'react-router-dom'
const UserOverView = () => {
      const [loadingTodos, setLoadingTodos] = useState(true)
      const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos()
        const todoData = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.todos)
            ? res.data.todos
            : []

        setTodos(todoData)
      } catch (error) {
        console.error('Error fetching todos:', error)
      } finally {
        setLoadingTodos(false)
      }
    }

    fetchTodos()
  }, [])

  const completedTasks = todos.filter((todo) => todo.completed).length
  const pendingTasks = todos.filter((todo) => !todo.completed).length


    return (
      <>
        <div className="w-full relative mt-5 rounded-3xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold mb-4">Your Overview</h3>
            <p className="text-zinc-400">Here you can see a quick overview of your tasks and progress. Keep track of your completed and pending tasks to stay organized and productive!</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-white/10 pt-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-zinc-400">Total Tasks</p>
                    <h4 className="mt-2 text-3xl font-bold text-white">
                        {loadingTodos ? '...' : todos.length}
                    </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-zinc-400">Completed</p>
                    <h4 className="mt-2 text-3xl font-bold text-green-400">
                        {loadingTodos ? '...' : completedTasks}
                    </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-zinc-400">Pending</p>
                    <h4 className="mt-2 text-3xl font-bold text-yellow-400">
                        {loadingTodos ? '...' : pendingTasks}
                    </h4>
                </div>
            </div>

        </div>
        
        <div className='flex justify-center py-[2vw]'>
            <Link to="mytask" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]">
                View My Tasks
            </Link>
        </div>
        
        </>
    )
}

export default UserOverView
