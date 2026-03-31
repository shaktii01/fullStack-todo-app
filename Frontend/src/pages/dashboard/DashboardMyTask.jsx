import React, { useEffect, useState } from 'react'
import { getTodos, deleteTodo, updateTodo } from '@/api/todoApi'

const getTodoId = (todo) => todo._id || todo.id

const getTodoColor = (todo) =>
  todo.color ||
  todo.noteColor ||
  todo.bgColor ||
  todo.colour ||
  '#27272b'

const getTodoDescription = (todo) =>
  todo.description ||
  todo.desc ||
  'No description available'

const DashboardMyTask = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await getTodos()
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.todos)
        ? res.data.todos
        : []

      console.log('Fetched todos:', data)
      setTodos(data)
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError(err?.response?.data?.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => getTodoId(todo) !== id))
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete task')
    }
  }

  const handleToggleStatus = async (todo) => {
    const id = getTodoId(todo)
    const updatedStatus = !todo.completed
    const currentColor = getTodoColor(todo)
    const currentDescription = getTodoDescription(todo)

    try {
      await updateTodo(id, {
        title: todo.title,
        description: currentDescription,
        color: currentColor,
        completed: updatedStatus,
      })

      setTodos((prev) =>
        prev.map((item) =>
          getTodoId(item) === id
            ? { ...item, completed: updatedStatus }
            : item
        )
      )
    } catch (err) {
      console.error('Status update error:', err)
      alert('Failed to update task status')
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black px-4 md:px-8 py-6">
        <div className="rounded-[32px] border border-white/10 bg-zinc-900/80 p-8 text-white">
          Loading tasks...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-black px-4 md:px-8 py-6">
        <div className="rounded-[32px] border border-red-500/20 bg-red-500/10 p-8 text-red-300">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black px-4 md:px-8 py-6">
      <div className="w-full rounded-[32px] border border-white/10 bg-zinc-900/80 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden">
        <div className="border-b border-white/10 px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Workspace
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">My Tasks</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Manage all your created tasks in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-sm text-zinc-400">Total Tasks</p>
            <h3 className="text-2xl font-bold text-white">{todos.length}</h3>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {todos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <h3 className="text-xl font-semibold text-white">No tasks found</h3>
              <p className="mt-2 text-zinc-400">
                Create your first task to see it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {todos.map((todo) => {
                const todoId = getTodoId(todo)
                const todoColor = getTodoColor(todo)
                const todoDescription = getTodoDescription(todo)

                return (
                  <div
                    key={todoId}
                    className="relative rounded-[28px] p-5 border border-white/10 shadow-lg overflow-hidden min-h-[250px] flex flex-col justify-between"
                    style={{ backgroundColor: todoColor }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.14))]" />

                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <span className="rounded-full border border-white/15 bg-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                        Task
                      </span>

                      <button
                        onClick={() => handleDelete(todoId)}
                        className="rounded-full bg-black/15 px-3 py-1 text-xs text-white border border-white/10 hover:bg-black/25 transition"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="relative z-10 mt-5">
                      <h3 className="text-2xl font-semibold text-white break-words line-clamp-2">
                        {todo.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/90 break-words line-clamp-5">
                        {todoDescription}
                      </p>
                    </div>

                    <div className="relative z-10 pt-5 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] border ${
                          todo.completed
                            ? 'bg-green-500/20 text-green-100 border-green-300/20'
                            : 'bg-yellow-500/20 text-yellow-100 border-yellow-300/20'
                        }`}
                      >
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>

                      <button
                        onClick={() => handleToggleStatus(todo)}
                        className="rounded-full bg-black/15 px-4 py-1.5 text-xs text-white border border-white/10 hover:bg-black/25 transition"
                      >
                        {todo.completed ? 'Mark Pending' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardMyTask