import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import MainLayout from '@/app/layouts/MainLayout'
import NotFoundLayout from '@/app/layouts/NotFoundLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  },
  {
    element: <NotFoundLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]

const router = createBrowserRouter(routes)

export default router