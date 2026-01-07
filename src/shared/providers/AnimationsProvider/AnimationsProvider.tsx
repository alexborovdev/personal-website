import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type AnimationsState = 'on' | 'off'

type AnimationsContextValue = {
  animations: AnimationsState
  toggleAnimations: () => void
}

const AnimationsContext = createContext<AnimationsContextValue | null>(null)

const STORAGE_KEY = 'animations'

export const AnimationsProvider = ({ children }: { children: ReactNode }) => {
  const [animations, setAnimations] = useState<AnimationsState>('on')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial: AnimationsState = saved === 'off' ? 'off' : 'on'

    setAnimations(initial)
  }, [])

  const toggleAnimations = () => {
    setAnimations(prevState => {
      const next: AnimationsState = prevState === 'on' ? 'off' : 'on'

      localStorage.setItem(STORAGE_KEY, next)

      return next
    })
  }

  return (
    <AnimationsContext.Provider
      value={{ animations, toggleAnimations }}
    >
      {children}
    </AnimationsContext.Provider>
  )
}

export const useAnimations = () => {
  const context = useContext(AnimationsContext)
  if (!context) {
    throw new Error('useAnimations must be used within AnimationsProvider')
  }
  return context
}