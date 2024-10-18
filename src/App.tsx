import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmailOtp from "./pages/VerifyEmailOtp";
import { Navbar } from "./components/pages-components/Navbar";
import Profile from "./pages/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="993013001927-j9mtbi0krufut6t355b5tnkdeov6khhm.apps.googleusercontent.com">
      <Register></Register>
    </GoogleOAuthProvider>
  )
}

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
        <GoogleAuthWrapper />
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
