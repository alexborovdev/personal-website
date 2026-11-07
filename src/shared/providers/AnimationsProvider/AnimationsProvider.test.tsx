// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { AnimationsProvider } from './AnimationsProvider'
import useAnimations from './useAnimation'

const wrapper = ({ children }: { children: ReactNode }) => (
  <AnimationsProvider>{children}</AnimationsProvider>
)

describe('AnimationsProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to on when no preference is stored', () => {
    const { result } = renderHook(() => useAnimations(), { wrapper })

    expect(result.current.animations).toBe('on')
    expect(localStorage.getItem('animations')).toBe('on')
  })

  it('restores saved animations preference from localStorage', () => {
    localStorage.setItem('animations', 'off')

    const { result } = renderHook(() => useAnimations(), {
      wrapper
    })

    expect(result.current.animations).toBe('off')
    expect(localStorage.getItem('animations')).toBe('off')
  })

  it('toggles animations and updates localStorage', () => {
    const { result } = renderHook(() => useAnimations(), {
      wrapper
    })

    expect(result.current.animations).toBe('on')

    act(() => {
      result.current.toggleAnimations()
    })

    expect(result.current.animations).toBe('off')
    expect(localStorage.getItem('animations')).toBe('off')

    act(() => {
      result.current.toggleAnimations()
    })

    expect(result.current.animations).toBe('on')
    expect(localStorage.getItem('animations')).toBe('on')
  })

  it('falls back to on when stored preference is invalid', () => {
    localStorage.setItem('animations', 'invalid-value')

    const { result } = renderHook(() => useAnimations(), {
      wrapper
    })

    expect(result.current.animations).toBe('on')
    expect(localStorage.getItem('animations')).toBe('on')
  })

  it('throws when useAnimations is used outside the provider', () => {
    expect(() => {
      renderHook(() => useAnimations())
    }).toThrow('useAnimations must be used within AnimationsProvider')
  })
})
