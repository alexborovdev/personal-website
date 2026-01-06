import { Outlet } from 'react-router-dom'
import ScrollBar from '@/components/ScrollBar'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'

const MainLayout = () => {
  return (
    <>
      <ScrollBar />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout