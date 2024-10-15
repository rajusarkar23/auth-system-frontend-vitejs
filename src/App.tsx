import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmailOtp from './pages/VerifyEmailOtp'

const router = createBrowserRouter([
  // Home route
  {
    path: "/",
    element: (
      <>
      <Home />
      </>
    )
  },
  // Register route
  {
    path: "/register",
    element: <Register />
  },
  // Loging route
  {
    path: "/login",
    element: <Login />
  },
  // Verify email otp form
  {
    path: "/verify-otp",
    element: <VerifyEmailOtp />
  }
])

function App() {
  return <RouterProvider  router={router}/> 
}

export default App
