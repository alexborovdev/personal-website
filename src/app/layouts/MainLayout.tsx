import { Outlet } from 'react-router-dom'
import { useTheme } from '@/shared/providers/ThemeProvider'
import { useAnimations } from '@/shared/providers/AnimationsProvider'
import ParticlesBackground from '@/components/ParticlesBackground'
import ScrollBar from '@/components/ScrollBar'

const MainLayout = () => {
  const { theme } = useTheme()
  const { animations } = useAnimations()

  return (
    <>
      <ParticlesBackground
        theme={theme}
        animations={animations}
      />
      <ScrollBar />
      <Outlet />
    </>
  )
}

export default MainLayout