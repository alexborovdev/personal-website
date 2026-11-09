// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BUTTON_ANIMATION_DURATION } from '@/shared/animations/timings'
import Hero from './Hero'

const mocks = vi.hoisted(() => ({
  scrollTo: vi.fn(),
  useScrollToSection: vi.fn(),
  onAnimationEnd: null as null | (() => void)
}))

vi.mock('@/shared/hooks/useScrollToSection', () => ({
  default: (isLocked: boolean) => {
    mocks.useScrollToSection(isLocked)
    return { scrollTo: mocks.scrollTo }
  }
}))

vi.mock('@/components/Greeting', () => ({
  default: ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
    mocks.onAnimationEnd = onAnimationEnd
    return <h1 id="hero-title">Hello!</h1>
  }
}))

vi.mock('@/shared/ui/Button', () => ({
  default: ({
    children,
    className,
    ariaLabel,
    onClick
  }: {
    children: React.ReactNode
    className: string
    ariaLabel: string
    onClick: () => void
  }) => (
    <button className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  )
}))

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.resetAllMocks()
  mocks.onAnimationEnd = null
})

describe('Hero', () => {
  it('renders accessible hero with initially locked scrolling', () => {
    const { container } = render(<Hero />)

    const section = container.querySelector('section')
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Hello!'
    })
    const button = screen.getByRole('button', {
      name: 'Scroll to Skills section'
    })

    expect(section?.id).toBe('hero')
    expect(section?.getAttribute('aria-labelledby')).toBe('hero-title')
    expect(section?.contains(heading)).toBe(true)

    expect(button.className).not.toContain('visible')
    expect(button.className).not.toContain('bounce')

    expect(mocks.useScrollToSection).toHaveBeenLastCalledWith(true)
  })

  it('unlocks scrolling and animates button after greeting finishes', () => {
    vi.useFakeTimers()

    render(<Hero />)

    const button = screen.getByRole('button', {
      name: 'Scroll to Skills section'
    })

    expect(mocks.onAnimationEnd).not.toBeNull()

    act(() => {
      mocks.onAnimationEnd?.()
    })

    expect(mocks.useScrollToSection).toHaveBeenLastCalledWith(false)
    expect(button.className).toContain('visible')
    expect(button.className).toContain('bounce')
  })

  it('removes bounce animation after its duration', () => {
    vi.useFakeTimers()

    render(<Hero />)

    const button = screen.getByRole('button', {
      name: 'Scroll to Skills section'
    })

    act(() => {
      mocks.onAnimationEnd?.()
    })

    expect(button.className).toContain('bounce')
    expect(button.className).toContain('visible')

    act(() => {
      vi.advanceTimersByTime(BUTTON_ANIMATION_DURATION - 1)
    })

    expect(button.className).toContain('bounce')

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(button.className).not.toContain('bounce')
    expect(button.className).toContain('visible')
  })

  it('navigates to Skills first and Portfolio on subsequent clicks', () => {
    render(<Hero />)

    const button = screen.getByRole('button', {
      name: 'Scroll to Skills section'
    })

    fireEvent.click(button)

    expect(mocks.scrollTo).toHaveBeenLastCalledWith('skills')
    expect(button.getAttribute('aria-label')).toBe('Scroll to Portfolio section')

    fireEvent.click(button)

    expect(mocks.scrollTo).toHaveBeenLastCalledWith('portfolio')

    fireEvent.click(button)

    expect(mocks.scrollTo).toHaveBeenCalledTimes(3)
    expect(mocks.scrollTo).toHaveBeenLastCalledWith('portfolio')
  })

  it('clears pending bounce timeout on unmount', () => {
    vi.useFakeTimers()

    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')

    try {
      const { unmount } = render(<Hero />)

      act(() => {
        mocks.onAnimationEnd?.()
      })

      expect(vi.getTimerCount()).toBe(1)

      unmount()

      expect(clearTimeoutSpy).toHaveBeenCalled()
      expect(vi.getTimerCount()).toBe(0)
    } finally {
      clearTimeoutSpy.mockRestore()
    }
  })
})
