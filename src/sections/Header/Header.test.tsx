// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { TOTAL_DELAY } from '@/shared/animations/timings'
import Header from './Header'

const mocks = vi.hoisted(() => ({
  scrollTo: vi.fn(),
  useScrollToSection: vi.fn(),
  stickyState: {
    isSticky: false,
    isShowOut: false
  }
}))

vi.mock('@/shared/hooks/useScrollToSection', () => ({
  default: (isLocked: boolean) => {
    mocks.useScrollToSection(isLocked)

    return { scrollTo: mocks.scrollTo }
  }
}))

vi.mock('@/shared/hooks/useStickyHeader', () => ({
  default: () => mocks.stickyState
}))

vi.mock('@/sections/Header/HeaderContent', () => ({
  default: ({ className }: { className: string }) => (
    <header
      data-testid="header"
      className={className}
    />
  )
}))

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.resetAllMocks()
  mocks.stickyState.isSticky = false
  mocks.stickyState.isShowOut = false
})

describe('Header', () => {
  it('transitions from initial render to normal header after delay', () => {
    vi.useFakeTimers()

    render(<Header />)

    const header = screen.getByTestId('header')

    expect(header.className).toContain('firstRender')

    act(() => {
      vi.advanceTimersByTime(TOTAL_DELAY)
    })

    expect(header.className).not.toContain('firstRender')
  })

  it('unlocks scrolling after the initial animation delay', () => {
    vi.useFakeTimers()

    render(<Header />)

    expect(mocks.useScrollToSection).toHaveBeenLastCalledWith(true)

    act(() => {
      vi.advanceTimersByTime(TOTAL_DELAY - 1)
    })

    expect(mocks.useScrollToSection).toHaveBeenLastCalledWith(true)

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(mocks.useScrollToSection).toHaveBeenLastCalledWith(false)
  })

  it('renders sticky header with show-in animation', () => {
    vi.useFakeTimers()

    mocks.stickyState.isSticky = true

    render(<Header />)

    act(() => {
      vi.advanceTimersByTime(TOTAL_DELAY)
    })

    const header = screen.getByTestId('header')

    expect(header.classList.contains('tile')).toBe(true)
    expect(header.className).toContain('stickyShowIn')
    expect(header.className).not.toContain('stickyShowOut')
  })

  it('keeps sticky header mounted during show-out animation', () => {
    vi.useFakeTimers()

    mocks.stickyState.isSticky = false
    mocks.stickyState.isShowOut = true

    render(<Header />)

    act(() => {
      vi.advanceTimersByTime(TOTAL_DELAY)
    })

    const header = screen.getByTestId('header')

    expect(header.classList.contains('tile')).toBe(true)
    expect(header.className).toContain('stickyShowOut')
    expect(header.className).not.toContain('stickyShowIn')
  })
})
