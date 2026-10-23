import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './features/auth/pages/login.jsx'
import Register from './features/auth/pages/Register.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <h1>Home page</h1>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;

}

export default App