import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserProfile } from '@/api/authApi'
import { getTodos } from '@/api/todoApi'

const UserCard = () => {
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingTodos, setLoadingTodos] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile()
        setUser(res||null)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserProfile()
  }, [])

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
    <div className="w-full rounded-3xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border border-white/10">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : user?.username ? (
              user.username.charAt(0).toUpperCase()
            ) : (
              'U'
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Profile Overview
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              {loadingUser ? 'Loading...' : user?.username || 'User'}
            </h3>
            <p className="mt-1 text-sm md:text-base text-zinc-400">
              {loadingUser ? 'Loading...' : user?.email || 'No email found'}
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/createTask"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
        >
          + Create New Task
        </Link>
      </div>

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
  )
}

export default UserCard