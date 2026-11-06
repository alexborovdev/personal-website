import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimationsContext, type AnimationsState } from './AnimationsContext'

const STORAGE_KEY = 'animations'

export const AnimationsProvider = ({ children }: { children: ReactNode }) => {
  const [animations, setAnimations] = useState<AnimationsState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'off' ? 'off' : 'on'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, animations)
  }, [animations])

  const toggleAnimations = () => {
    setAnimations(prevState => prevState === 'on' ? 'off' : 'on')
  }

  return (
    <AnimationsContext.Provider value={{ animations, toggleAnimations }}>
      {children}
    </AnimationsContext.Provider>
  )
}