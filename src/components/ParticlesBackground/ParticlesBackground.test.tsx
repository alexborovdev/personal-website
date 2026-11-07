// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import createParticlesConfig from '@/shared/config/particles'
import ParticlesBackground from './ParticlesBackground'

type ParticlesProps = {
  options: unknown
  init: unknown
}

const mocks = vi.hoisted(() => ({
  particles: vi.fn<(props: ParticlesProps) => void>()
}))

vi.mock('react-tsparticles', () => ({
  default: (props: ParticlesProps) => {
    mocks.particles(props)

    return <div data-testid="particles" />
  }
}))

vi.mock('tsparticles-slim', () => ({
  loadSlim: vi.fn()
}))

vi.mock('@/shared/config/particles', () => ({
  default: vi.fn(() => ({}))
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('ParticlesBackground', () => {
  it('does not render particles when animations are off', () => {
    const { container } = render(<ParticlesBackground theme="dark" animations="off" />)

    expect(container.firstElementChild).toBeNull()
  })

  it('renders particles with configuration when animations are on', () => {
    render(<ParticlesBackground theme="dark" animations="on" />)

    expect(screen.getByTestId('particles')).toBeDefined()
    expect(mocks.particles).toHaveBeenCalledOnce()

    const props = mocks.particles.mock.calls[0][0]

    expect(props.options).toEqual({})
    expect(typeof props.init).toBe('function')
  })

  it('recreates particles when theme changes', () => {
    const { rerender } = render(<ParticlesBackground theme="dark" animations="on" />)

    expect(createParticlesConfig).toHaveBeenCalledTimes(1)

    rerender(<ParticlesBackground theme="light" animations="on" />)

    expect(createParticlesConfig).toHaveBeenCalledTimes(2)
    expect(mocks.particles).toHaveBeenCalledTimes(2)
  })
})
