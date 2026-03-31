import React from 'react'
import UserCard from '../../components/dashboard/UserCard'

const DashboardHome = () => {
    return (
        <div className='w-full h-full bg-zinc-900 text-zinc-200 p-10'>

            {/* Header */}
            <h2 className='text-3xl font-semibold mb-8 border-b border-zinc-700 pb-5'>
                Welcome to your Dashboard 👋
            </h2>

            <UserCard />

        </div>
    )
}

export default DashboardHome