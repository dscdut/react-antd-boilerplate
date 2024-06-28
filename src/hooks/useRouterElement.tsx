import { AppContext, AppContextType } from '@/contexts/app.context'
import LayoutMain from '@/layouts/LayoutMain'
import Home from '@/page/Home'
import Login from '@/page/auth/Login'
import Register from '@/page/auth/Register'
import UsersDetails from '@/page/users/UsersDetails'
import UsersPage from '@/page/users/UsersPage'
import { useContext } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext)
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? children : <Navigate to='/login' />
  }

  const routeElements = useRoutes([
    { path: '/', element: <LayoutMain children={<Home />} /> },
    { path: '/login', element: isAuthenticated ? <Navigate to='/' /> : <Login /> },
    { path: '/register', element: isAuthenticated ? <Navigate to='/' /> : <Register /> },
    {
      path: '/users',
      element: (
        <ProtectedRoute>
          <LayoutMain children={<UsersPage />} />
        </ProtectedRoute>
      )
    },
    {
      path: '/users/:id',
      element: (
        <ProtectedRoute>
          <LayoutMain children={<UsersDetails />} />
        </ProtectedRoute>
      )
    },
    { path: '*', element: <h1>404</h1> }
  ])

  return routeElements
}
