import { useCallback, useMemo } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'
import createParticlesConfig from '@/shared/config/particles'

type Props = {
  theme: 'dark' | 'light'
}

const ParticlesBackground = ({ theme }: Props) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => createParticlesConfig(),
    [theme]
  )

  return (
    <Particles
      key={theme}
      init={particlesInit}
      options={options}
    />
  )
}

export default ParticlesBackground