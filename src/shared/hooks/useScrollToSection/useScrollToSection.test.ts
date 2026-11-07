// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useScrollToSection from './useScrollToSection'

describe('useScrollToSection', () => {
  const scrollToMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    document.body.innerHTML = ''
    document.body.style.overflow = ''

    vi.stubGlobal('scrollTo', scrollToMock)
    vi.stubGlobal('scrollY', 200)
  })

  it('scrolls to the target section with smooth behavior', () => {
    const section = document.createElement('section')
    section.id = 'skills'

    document.body.appendChild(section)

    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      bottom: 800,
      left: 0,
      right: 100,
      width: 100,
      height: 300,
      x: 0,
      y: 500,
      toJSON: () => ({})
    })

    const { result } = renderHook(() => useScrollToSection())

    act(() => {
      result.current.scrollTo('skills')
    })

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 700,
      behavior: 'smooth'
    })
  })

  it('scrolls to the top when target is hero', () => {
    const hero = document.createElement('section')
    hero.id = 'hero'
    document.body.appendChild(hero)

    const { result } = renderHook(() => useScrollToSection())

    act(() => {
      result.current.scrollTo('hero')
    })

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('prevents scrolling when locked', () => {
    const section = document.createElement('section')
    section.id = 'skills'
    document.body.appendChild(section)

    const { result } = renderHook(() => useScrollToSection(true))

    expect(document.body.style.overflow).toBe('hidden')

    act(() => {
      result.current.scrollTo('skills')
    })

    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('enables scrolling when unlocked', () => {
    const hero = document.createElement('section')
    hero.id = 'hero'
    document.body.appendChild(hero)

    const { result, rerender } = renderHook(({ locked }) => useScrollToSection(locked), {
      initialProps: { locked: true }
    })

    expect(document.body.style.overflow).toBe('hidden')

    rerender({ locked: false })

    expect(document.body.style.overflow).toBe('')

    act(() => {
      result.current.scrollTo('hero')
    })

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('does not scroll when the target section does not exist', () => {
    const { result } = renderHook(() => useScrollToSection())

    act(() => {
      result.current.scrollTo('non-existent-section')
    })

    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('makes the target focusable and focuses it after scrolling', () => {
    const section = document.createElement('section')
    section.id = 'skills'
    document.body.appendChild(section)

    const focusSpy = vi.spyOn(section, 'focus')

    const { result } = renderHook(() => useScrollToSection())

    act(() => {
      result.current.scrollTo('skills')
    })

    expect(section.getAttribute('tabindex')).toBe('-1')

    expect(focusSpy).toHaveBeenCalledWith({
      preventScroll: true
    })

    expect(document.activeElement).toBe(section)
  })
})
