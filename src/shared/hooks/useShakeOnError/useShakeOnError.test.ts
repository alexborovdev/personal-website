// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useShakeOnError from './useShakeOnError'

describe('useShakeOnError', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('initializes with empty shakeFields', () => {
    const { result } = renderHook(() => useShakeOnError())

    expect(result.current.shakeFields).toEqual({})
  })

  it('activates shake for specified fields', () => {
    const { result } = renderHook(() => useShakeOnError())

    act(() => {
      result.current.triggerShake(['name', 'email'])
    })

    expect(result.current.shakeFields).toEqual({
      name: true,
      email: true
    })
  })

  it('clears shakeFields after the default duration', () => {
    const { result } = renderHook(() => useShakeOnError())

    act(() => {
      result.current.triggerShake(['email'])
    })

    expect(result.current.shakeFields).toEqual({
      email: true
    })

    act(() => {
      vi.advanceTimersByTime(399)
    })

    expect(result.current.shakeFields).toEqual({
      email: true
    })

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current.shakeFields).toEqual({})
  })

  it('clears shakeFields after custom duration', () => {
    const { result } = renderHook(() =>
      useShakeOnError({ duration: 1000 })
    )

    act(() => {
      result.current.triggerShake(['name'])
    })

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(result.current.shakeFields).toEqual({
      name: true
    })

    act(() => {
      vi.advanceTimersByTime(600)
    })

    expect(result.current.shakeFields).toEqual({})
  })

  it('does nothing when no fields are provided', () => {
    const { result } = renderHook(() => useShakeOnError())

    act(() => {
      result.current.triggerShake([])
    })

    expect(result.current.shakeFields).toEqual({})
    expect(vi.getTimerCount()).toBe(0)
  })
})