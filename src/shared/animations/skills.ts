import type { Variants } from 'framer-motion'

export const skillsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const skillFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
}

export const skillFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 32
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
}