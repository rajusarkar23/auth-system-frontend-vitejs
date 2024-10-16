import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmailOtp from "./pages/VerifyEmailOtp";
import { Navbar } from "./components/pages-components/Navbar";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  // Home route
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  // Register route
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },
  // Loging route
  {
    path: "/login",
    element: (
      <>
      <Navbar />
      <Login />
      </>
    )
  },
  // Verify email otp form
  {
    path: "/verify-otp",
    element: <VerifyEmailOtp />,
  },
  // Profile page
  {
    path: "/profile",
    element: (
      <>
      <Navbar />
      <Profile />
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
