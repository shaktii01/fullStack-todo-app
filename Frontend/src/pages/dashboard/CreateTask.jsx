import React, { useState } from 'react'
import { createTodo } from '@/api/todoApi' // adjust path if needed

const colorOptions = [
  { name: 'Ocean', value: '#3B82F6' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#EC4899' },
  { name: 'Coral', value: '#EF4444' },
]

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '#8B5CF6',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleColorSelect = (color) => {
    setFormData((prev) => ({
      ...prev,
      color,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        color: formData.color,
      }

      const res = await createTodo(payload)
      console.log('Created Todo:', res.data)
      console.log('Fetched todos:', data)


      setSuccess('Task created successfully')
      setFormData({
        title: '',
        description: '',
        color: '#8B5CF6',
      })
    } catch (err) {
      console.error('Create task error:', err)
      setError(err?.response?.data?.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <div className="w-full min-h-screen bg-black px-4 md:px-8 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-[520px] rounded-[36px] border border-white/10 bg-zinc-900/80 shadow-[0_25px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] h-full">
          {/* Left Panel */}
          <div className="relative border-b xl:border-b-0 xl:border-r border-white/10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black p-6 md:p-8 xl:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_28%)] pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                Premium Workspace
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Create a new task
              </h2>

              <p className="mt-3 max-w-xl text-sm md:text-base leading-7 text-zinc-400">
                Build a premium task card with clean details and a beautiful accent color.
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Task title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write task details..."
                  className="h-44 md:h-52 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
                  required
                />
              </div>

              {(success || error) && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${success
                      ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                      : 'bg-red-500/10 text-red-300 border border-red-500/20'
                    }`}
                >
                  {success || error}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 md:p-8 xl:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_30%)] pointer-events-none" />

            {/* Top right controls */}
            <div className="relative z-10 flex items-start justify-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-3 text-right">
                  Accent color
                </p>

                <div className="flex flex-wrap justify-end gap-3 max-w-[260px] ml-auto">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleColorSelect(color.value)}
                      title={color.name}
                      className={`relative h-11 w-11 rounded-full transition duration-200 ${formData.color === color.value
                          ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                          : 'hover:scale-105'
                        }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="absolute inset-0 rounded-full bg-white/10" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-6">
              <div
                className="relative w-full max-w-md h-[280px] rounded-[28px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/15 flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: formData.color }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05)_38%,rgba(0,0,0,0.10))]" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    Live Preview
                  </span>

                  <span className="rounded-full bg-black/10 px-3 py-1 text-[11px] text-white/90 border border-white/10">
                    {colorOptions.find((c) => c.value === formData.color)?.name}
                  </span>
                </div>

                <div className="relative z-10 mt-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-white break-words line-clamp-2">
                    {formData.title || 'Your task title'}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/90 break-words line-clamp-5">
                    {formData.description ||
                      'Your task description will appear here in a compact premium preview card.'}
                  </p>
                </div>

                <div className="relative z-10 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                    Ready to save
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="relative z-10 flex items-end justify-between gap-4 pt-2">
              <p className="text-sm text-zinc-400">
                Create beautifully styled tasks for your workspace.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTask