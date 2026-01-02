import { Outlet } from 'react-router-dom'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout