import type { Variants } from 'framer-motion'

export const containerDesktop: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.115,
      delayChildren: 0.115
    }
  }
}

export const containerMobile: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.065
    }
  }
}

export const fromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

export const fromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}