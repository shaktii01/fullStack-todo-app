import React from 'react'
import LoginPage from '@/pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from '@/pages/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import ProtectedRoute from '@/routes/ProtectedRoute'
import Home from '@/pages/Home'
import DashboardHome from '@/pages/dashboard/DashboardHome'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import DashboardMyTask from '@/pages/dashboard/DashboardMyTask'
import CreateTask from '@/pages/dashboard/CreateTask'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className=' h-screen'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="mytask" element={<DashboardMyTask />} />
          <Route path="createTask" element={<CreateTask />} />

        </Route>






      </Routes>
    </div>
  )
}

export default App
