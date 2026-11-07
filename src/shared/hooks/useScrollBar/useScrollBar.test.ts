// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useScrollBar from './useScrollBar'

describe('useScrollBar', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollY', 0)
    vi.stubGlobal('innerHeight', 1000)

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000
    })
  })

  it('calculates initial scroll progress on mount', () => {
    vi.stubGlobal('scrollY', 500)

    const { result } = renderHook(() => useScrollBar())

    expect(result.current).toBe(0.25)
  })

  it('updates progress on scroll', () => {
    const { result } = renderHook(() => useScrollBar())

    expect(result.current).toBe(0)

    vi.stubGlobal('scrollY', 1000)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(0.5)
  })

  it('clamps progress between 0 and 1', () => {
    const { result } = renderHook(() => useScrollBar())

    vi.stubGlobal('scrollY', -100)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(0)

    vi.stubGlobal('scrollY', 3000)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(1)
  })

  it('returns 0 when the page is not scrollable', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 800
    })

    vi.stubGlobal('scrollY', 500)

    const { result } = renderHook(() => useScrollBar())

    expect(result.current).toBe(0)
  })

  it('removes scroll and resize listeners on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    try {
      const { unmount } = renderHook(() => useScrollBar())

      const scrollCallback = addSpy.mock.calls.find(
        ([event]) => event === 'scroll'
      )?.[1]

      const resizeCallback = addSpy.mock.calls.find(
        ([event]) => event === 'resize'
      )?.[1]

      expect(scrollCallback).toBeDefined()
      expect(resizeCallback).toBeDefined()

      unmount()

      expect(removeSpy).toHaveBeenCalledWith(
        'scroll',
        scrollCallback
      )

      expect(removeSpy).toHaveBeenCalledWith(
        'resize',
        resizeCallback
      )
    } finally {
      addSpy.mockRestore()
      removeSpy.mockRestore()
    }
  })
})