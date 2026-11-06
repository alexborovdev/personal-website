import { useState } from 'react'
import type { ReactNode } from 'react'
import {  AnimationsContext,  type AnimationsState} from './AnimationsContext'

const STORAGE_KEY = 'animations'

export const AnimationsProvider = ({ children }: { children: ReactNode }) => {
  const [animations, setAnimations] = useState<AnimationsState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'off' ? 'off' : 'on'
  })

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