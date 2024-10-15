import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

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
  }
])

function App() {
  return <RouterProvider  router={router}/> 
}

export default App
