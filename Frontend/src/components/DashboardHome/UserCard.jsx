import React, { useEffect, useState } from 'react'
import { getUserProfile } from '@/api/authApi'
import { Link } from 'react-router-dom'


const UserCard = () => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile()
        setUser(res || null)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserProfile()
  }, [])
  return (
    <div className="w-full relative z-2  rounded-3xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-[8vw] w-[8vw] rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border border-white/10">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="user"
                className="h-full w-full object-cover"
              />
            ) : user?.username ? (
              user.username.charAt(0).toUpperCase()
            ) : (
              'U'
            )}
          </div>

          <div>
            <p className="text-[1vw] font-semibold uppercase absolute top-[1.5vw] tracking-[0.25em] text-zinc-500">
              Profile Overview
            </p>
            <h3 className="mt-2 text-2xl md:text-[1.5vw] font-semibold text-white">
              {loadingUser ? 'Loading...' : user?.username || 'User'}
            </h3>
            <p className="mt-1 text-[1.2vw] md:text-base text-zinc-400">
              {loadingUser ? 'Loading...' : user?.email || 'No email found'}
            </p>
          </div>
        </div>

       <div 
          className="inline-flex relative items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
       >
         <Link to="settings">
          Edit Profile
         </Link>
       </div>

       

      </div>


    </div>
  )
}

export default UserCard