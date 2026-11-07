// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { BUTTON_FIRST_RENDER_DELAY } from '@/shared/animations/timings'
import Greeting from './Greeting'

const mocks = vi.hoisted(() => ({
  sequences: [] as (string | number | (() => void))[][]
}))

vi.mock('react-type-animation', () => ({
  TypeAnimation: (props: { sequence: (string | number | (() => void))[] }) => {
    mocks.sequences.push(props.sequence)
    return <span data-testid="type-animation" />
  }
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
  mocks.sequences.length = 0
})

describe('Greeting', () => {
  it('renders accessible greeting content', () => {
    render(<Greeting onAnimationEnd={vi.fn()} />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Hello! My name is Alex Borov'
    })

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: "I'm a frontend developer."
    })

    expect(heading.id).toBe('hero-title')
    expect(subtitle).toBeDefined()

    expect(screen.getByText('I can do something great for you.')).toBeDefined()

    expect(screen.getAllByTestId('type-animation')).toHaveLength(1)
  })

  it('progresses through all animation steps', () => {
    render(<Greeting onAnimationEnd={vi.fn()} />)

    expect(screen.getAllByTestId('type-animation')).toHaveLength(1)

    const firstSequence = mocks.sequences[0]
    const firstCallback = firstSequence[1]

    expect(typeof firstCallback).toBe('function')

    act(() => {
      if (typeof firstCallback === 'function') {
        firstCallback()
      }
    })

    expect(screen.getAllByTestId('type-animation')).toHaveLength(2)

    const secondSequence = mocks.sequences.find(sequence => sequence[0] === 'Alex\u00A0Borov')

    const secondCallback = secondSequence?.[2]

    expect(typeof secondCallback).toBe('function')

    act(() => {
      if (typeof secondCallback === 'function') {
        secondCallback()
      }
    })

    expect(screen.getAllByTestId('type-animation')).toHaveLength(3)
  })

  it('calls onAnimationEnd after the configured delay', () => {
    vi.useFakeTimers()

    try {
      const onAnimationEnd = vi.fn()

      render(<Greeting onAnimationEnd={onAnimationEnd} />)

      const firstCallback = mocks.sequences[0][1]

      act(() => {
        if (typeof firstCallback === 'function') {
          firstCallback()
        }
      })

      const secondSequence = mocks.sequences.find(sequence => sequence[0] === 'Alex\u00A0Borov')

      const secondCallback = secondSequence?.[2]

      act(() => {
        if (typeof secondCallback === 'function') {
          secondCallback()
        }
      })

      const subtitleSequence = mocks.sequences.find(
        sequence =>
          typeof sequence[0] === 'string' && sequence[0].startsWith("I'm a frontend developer.")
      )

      const subtitleCallback = subtitleSequence?.[1]

      act(() => {
        if (typeof subtitleCallback === 'function') {
          subtitleCallback()
        }
      })

      expect(onAnimationEnd).not.toHaveBeenCalled()

      act(() => {
        vi.advanceTimersByTime(BUTTON_FIRST_RENDER_DELAY - 1)
      })

      expect(onAnimationEnd).not.toHaveBeenCalled()

      act(() => {
        vi.advanceTimersByTime(1)
      })

      expect(onAnimationEnd).toHaveBeenCalledOnce()
    } finally {
      vi.useRealTimers()
    }
  })
})
