import React from 'react'
import UserCard from '@/components/DashboardHome/UserCard'
import UserOverView from '@/components/DashboardHome/UserOverView'

const Home = () => {
    return (
        <div className='w-full h-full bg-black text-zinc-200 p-10'>

            {/* Header */}
            <h2 className='text-3xl font-semibold mb-8 border-b border-zinc-700 pb-5'>
                Welcome to your Profile 
            </h2>

            <UserCard />
            <UserOverView/>

        </div>
    )
}

export default Home