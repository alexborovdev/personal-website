import { useContext } from 'react'
import { AnimationsContext } from './AnimationsContext'

const useAnimations = () => {
  const context = useContext(AnimationsContext)

  if (!context) {
    throw new Error('useAnimations must be used within AnimationsProvider')
  }

  return context
}

export default useAnimations
