import type { ISourceOptions } from 'tsparticles-engine'

const particles: ISourceOptions = {
  fullScreen: true,
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
      },
    },
    color: {
      value: 'rgb(223, 157, 200)',
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: {
        min: 0.1,
        max: 0.2
      },
      animation: {
        enable: true,
        speed: 1,
      },
    },
    size: {
      value: {
        min: 1,
        max: 8,
      },
      animation: {
        enable: true,
        speed: 5,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: 'rgb(170, 54, 124)',
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
      onClick: {
        enable: false,
      },
    },
  },
  background: {
    color: 'transparent',
  },
}

export default particles