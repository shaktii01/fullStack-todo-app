import React from 'react'
import LeftPanel from '@/components/loginpage/LeftPanel'
import LoginForm from '@/components/loginpage/LoginForm'

const LoginPage = () => {
  return (
     <div className="h-full   flex items-center justify-center bg-gray-900">
      <div className="w-[50vw] h-2/3 rounded-3xl overflow-hidden shadow-xl flex">
        <LeftPanel />
        <LoginForm />
      </div>
    </div>
  )
} 

export default LoginPage
