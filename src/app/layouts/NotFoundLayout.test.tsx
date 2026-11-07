// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import NotFoundLayout from './NotFoundLayout'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { AnimationsProvider } from '@/shared/providers/AnimationsProvider'

vi.mock('@/components/ParticlesBackground', () => ({
  default: ({
    theme,
    animations
  }: {
    theme: string
    animations: string
  }) => (
    <div
      data-testid="particles"
      data-theme={theme}
      data-animations={animations}
    />
  )
}))

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('NotFoundLayout', () => {
  it('renders particles and the nested page', () => {
    const router = createMemoryRouter(
      [
        {
          element: <NotFoundLayout />,
          children: [
            {
              path: '*',
              element: <main>404 content</main>
            }
          ]
        }
      ],
      { initialEntries: ['/unknown'] }
    )

    render(
      <ThemeProvider>
        <AnimationsProvider>
          <RouterProvider router={router} />
        </AnimationsProvider>
      </ThemeProvider>
    )

    expect(screen.getByTestId('particles')).toBeTruthy()
    expect(screen.getByText('404 content')).toBeTruthy()
  })

  it('passes theme and animations preferences to particles', () => {
    localStorage.setItem('theme', 'light')
    localStorage.setItem('animations', 'off')

    const router = createMemoryRouter(
      [{ path: '*', element: <NotFoundLayout /> }],
      { initialEntries: ['/unknown'] }
    )

    render(
      <ThemeProvider>
        <AnimationsProvider>
          <RouterProvider router={router} />
        </AnimationsProvider>
      </ThemeProvider>
    )

    const particles = screen.getByTestId('particles')

    expect(particles.getAttribute('data-theme')).toBe('light')
    expect(particles.getAttribute('data-animations')).toBe('off')
  })
})