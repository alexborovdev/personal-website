import type { Variants } from 'framer-motion'

export const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    }
  }
}

export const items: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}