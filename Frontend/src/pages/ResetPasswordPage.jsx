import React from 'react'
import ResetPasswordForm from '../components/resetpasword/ResetPasswordForm'
import LeftPanel from '../components/loginpage/LeftPanel'

const ResetPasswordPage = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[900px] h-[550px] rounded-3xl overflow-hidden shadow-2xl flex">
        <LeftPanel />
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPasswordPage
