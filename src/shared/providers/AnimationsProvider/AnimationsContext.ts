import { createContext } from 'react'

export type AnimationsState = 'on' | 'off'

export type AnimationsContextValue = {
  animations: AnimationsState
  toggleAnimations: () => void
}

export const AnimationsContext = createContext<AnimationsContextValue | null>(null)
