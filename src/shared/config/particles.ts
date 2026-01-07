import type { ISourceOptions } from 'tsparticles-engine'
import getCssVar from '@/shared/tools/getCssVar'

const createParticlesConfig = (): ISourceOptions => {
  const accent = getCssVar('--color-accent')

  return {
    fullScreen: true,
    particles: {
      number: {
        value: 60,
        density: { enable: true },
      },
      color: {
        value: accent,
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.05, max: 0.1 },
        animation: { enable: true, speed: 1 },
      },
      size: {
        value: { min: 1, max: 8 },
        animation: { enable: true, speed: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: accent,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.75,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'slow',
          parallax: {
            enable: true,
            smooth: 20,
            force: 225,
          },
        },
        onClick: { enable: false },
      },
    },
    background: {
      color: 'transparent',
    },
  }
}

export default createParticlesConfig