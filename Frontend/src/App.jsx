import LoginPage from '@/pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from '@/pages/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import ProtectedRoute from '@/routes/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import MyTask from '@/pages/dashboard/MyTask'
import Settings from '@/pages/dashboard/Settings'
import Home from './pages/dashboard/Home'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className=' h-screen bg-gray-900'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
          <Route index element={<Home />} />

          <Route path="profile" element={<Home />} />
          <Route path="mytask" element={<MyTask />} />
          <Route path="settings" element={<Settings />} />

        </Route>






      </Routes>
    </div>
  )
}

export default App
