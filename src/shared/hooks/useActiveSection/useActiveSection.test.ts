// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useActiveSection from './useActiveSection'

const observe = vi.fn()
const disconnect = vi.fn()

let observerCallback: IntersectionObserverCallback

const intersectionObserverMock = vi.fn(function (
  this: IntersectionObserver,
  callback: IntersectionObserverCallback
) {
  observerCallback = callback
  this.observe = observe
  this.disconnect = disconnect
})

describe('useActiveSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.stubGlobal('IntersectionObserver', intersectionObserverMock)

    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="skills"></section>
      <section id="portfolio"></section>
      <section id="contacts"></section>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.unstubAllGlobals()
  })

  it('returns hero as the initial active section', () => {
    const { result } = renderHook(() => useActiveSection())

    expect(result.current).toBe('hero')
  })

  it('observes all available sections', () => {
    renderHook(() => useActiveSection())

    expect(intersectionObserverMock).toHaveBeenCalledOnce()

    expect(intersectionObserverMock).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    )

    expect(observe).toHaveBeenCalledTimes(4)

    for (const id of ['hero', 'skills', 'portfolio', 'contacts']) {
      expect(observe).toHaveBeenCalledWith(
        document.getElementById(id)
      )
    }
  })

  it('updates active section when a section intersects', () => {
    const { result } = renderHook(() => useActiveSection())

    const skills = document.getElementById('skills')!

    act(() => {
      observerCallback(
        [
          {
            target: skills,
            isIntersecting: true
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('skills')
  })

  it('ignores sections that are not intersecting', () => {
    const { result } = renderHook(() => useActiveSection())

    const skills = document.getElementById('skills')!

    act(() => {
      observerCallback(
        [
          {
            target: skills,
            isIntersecting: true
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('skills')

    act(() => {
      observerCallback(
        [
          {
            target: skills,
            isIntersecting: false
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('skills')
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection())

    expect(disconnect).not.toHaveBeenCalled()

    unmount()

    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('does not create an observer when no sections exist', () => {
    document.body.innerHTML = ''

    const { result } = renderHook(() => useActiveSection())

    expect(result.current).toBe('hero')
    expect(intersectionObserverMock).not.toHaveBeenCalled()
    expect(observe).not.toHaveBeenCalled()
  })
})