import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/app/layouts/MainLayout'
import NotFoundLayout from '@/app/layouts/NotFoundLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    element: <NotFoundLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router