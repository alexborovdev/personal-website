import { useCallback, useMemo } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'
import createParticlesConfig from '@/shared/config/particles'

type Props = {
  theme: 'dark' | 'light'
  animations: 'on' | 'off'
}

const ParticlesBackground = (props: Props) => {
  const { theme, animations } = props

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => createParticlesConfig(),
    // Theme changes CSS variables used by createParticlesConfig().
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  )

  if (animations === 'off') {
    return null
  }

  return (
    <Particles
      key={theme}
      init={particlesInit}
      options={options}
    />
  )
}

export default ParticlesBackground