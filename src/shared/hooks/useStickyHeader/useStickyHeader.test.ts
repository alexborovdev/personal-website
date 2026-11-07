// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useStickyHeader from './useStickyHeader'

const observeMock = vi.fn()
const disconnectMock = vi.fn()

let observerCallback: IntersectionObserverCallback

const IntersectionObserverMock = vi.fn(function (
  this: IntersectionObserver,
  callback: IntersectionObserverCallback
) {
  observerCallback = callback

  this.observe = observeMock
  this.disconnect = disconnectMock
})

describe('useStickyHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    document.body.innerHTML = '<section id="hero"></section>'

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('initializes with inactive sticky header', () => {
    const { result } = renderHook(() => useStickyHeader())

    expect(result.current).toEqual({
      isSticky: false,
      isShowOut: false
    })

    expect(observeMock).toHaveBeenCalledWith(document.getElementById('hero'))
  })

  it('activates sticky header when hero leaves the viewport', () => {
    const { result } = renderHook(() => useStickyHeader())

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toEqual({
      isSticky: true,
      isShowOut: false
    })
  })

  it('hides sticky header after exit animation when hero returns', () => {
    const { result } = renderHook(() => useStickyHeader())

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current.isSticky).toBe(true)

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toEqual({
      isSticky: true,
      isShowOut: true
    })

    act(() => {
      vi.advanceTimersByTime(79)
    })

    expect(result.current.isSticky).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current).toEqual({
      isSticky: false,
      isShowOut: false
    })
  })

  it('cancels exit animation when hero leaves again', () => {
    const { result } = renderHook(() => useStickyHeader())

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )

      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toEqual({
      isSticky: true,
      isShowOut: true
    })

    act(() => {
      vi.advanceTimersByTime(40)
    })

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toEqual({
      isSticky: true,
      isShowOut: false
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toEqual({
      isSticky: true,
      isShowOut: false
    })
  })

  it('does not create an observer when hero is missing', () => {
    document.body.innerHTML = ''

    const { result } = renderHook(() => useStickyHeader())

    expect(result.current).toEqual({
      isSticky: false,
      isShowOut: false
    })

    expect(IntersectionObserverMock).not.toHaveBeenCalled()
    expect(observeMock).not.toHaveBeenCalled()
  })

  it('disconnects observer and clears timeout on unmount', () => {
    const { unmount } = renderHook(() => useStickyHeader())

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(vi.getTimerCount()).toBe(1)

    unmount()

    expect(disconnectMock).toHaveBeenCalledOnce()
    expect(vi.getTimerCount()).toBe(0)
  })
})
