// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useMediaQuery from './useMediaQuery'

const addEventListener = vi.fn()
const removeEventListener = vi.fn()

let matches = false

const matchMediaMock = vi.fn((query: string) => ({
  matches,
  media: query,
  addEventListener,
  removeEventListener
}))

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    matches = false
    vi.stubGlobal('matchMedia', matchMediaMock)
  })

  it('returns false when the media query does not match', () => {
    const { result } = renderHook(() =>
      useMediaQuery('(max-width: 768px)')
    )

    expect(result.current).toBe(false)
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 768px)')
  })

  it('returns true when the media query matches', () => {
    matches = true

    const { result } = renderHook(() =>
      useMediaQuery('(max-width: 768px)')
    )

    expect(result.current).toBe(true)
  })

  it('updates when the media query match changes', () => {
    const { result } = renderHook(() =>
      useMediaQuery('(max-width: 768px)')
    )

    expect(result.current).toBe(false)

    // Callback, який useSyncExternalStore передав у subscribe
    const callback = addEventListener.mock.calls[0][1] as () => void

    act(() => {
      matches = true
      callback()
    })

    expect(result.current).toBe(true)

    act(() => {
      matches = false
      callback()
    })

    expect(result.current).toBe(false)
  })

  it('removes the change listener on unmount', () => {
    const { unmount } = renderHook(() =>
      useMediaQuery('(max-width: 768px)')
    )

    expect(addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )

    const callback = addEventListener.mock.calls[0][1]

    unmount()

    expect(removeEventListener).toHaveBeenCalledWith(
      'change',
      callback
    )
  })

  it('resubscribes when the query changes', () => {
    const { rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: '(max-width: 768px)' }
      }
    )

    const oldCallback = addEventListener.mock.calls[0][1]

    rerender({ query: '(max-width: 1024px)' })

    expect(removeEventListener).toHaveBeenCalledWith(
      'change',
      oldCallback
    )

    expect(matchMediaMock).toHaveBeenCalledWith(
      '(max-width: 1024px)'
    )

    expect(addEventListener).toHaveBeenCalledTimes(2)
  })
})