import { Outlet } from 'react-router-dom'
import { useTheme } from '@/shared/providers/ThemeProvider'
import ParticlesBackground from '@/components/ParticlesBackground'
import ScrollBar from '@/components/ScrollBar'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'

const MainLayout = () => {
  const { theme } = useTheme()

  return (
    <>
      <ParticlesBackground theme={theme} />
      <ScrollBar />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout