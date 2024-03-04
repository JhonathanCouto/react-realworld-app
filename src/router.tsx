import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/layout'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])