import { Outlet } from 'react-router-dom'
import ParticlesBackground from '@/components/ParticlesBackground'
import ScrollBar from '@/components/ScrollBar'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'

const MainLayout = () => {
  return (
    <>
      <ParticlesBackground />
      <ScrollBar />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout