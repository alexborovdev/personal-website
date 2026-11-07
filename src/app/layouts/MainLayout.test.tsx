// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import {  createMemoryRouter,  RouterProvider} from 'react-router-dom'
import MainLayout from './MainLayout'
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

vi.mock('@/components/ScrollBar', () => ({
  default: () => <div data-testid="scrollbar" />
}))

vi.mock('@/sections/Header', () => ({
  default: () => <header data-testid="header" />
}))

vi.mock('@/sections/Footer', () => ({
  default: () => <footer data-testid="footer" />
}))

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('MainLayout', () => {
  it('renders shared components and the nested page', () => {
    const router = createMemoryRouter(
      [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <main>Home content</main>
            }
          ]
        }
      ],
      { initialEntries: ['/'] }
    )

    render(
      <ThemeProvider>
        <AnimationsProvider>
          <RouterProvider router={router} />
        </AnimationsProvider>
      </ThemeProvider>
    )

    expect(screen.getByTestId('particles')).toBeTruthy()
    expect(screen.getByTestId('scrollbar')).toBeTruthy()
    expect(screen.getByTestId('header')).toBeTruthy()
    expect(screen.getByText('Home content')).toBeTruthy()
    expect(screen.getByTestId('footer')).toBeTruthy()
  })

  it('passes theme and animations preferences to particles', () => {
    localStorage.setItem('theme', 'light')
    localStorage.setItem('animations', 'off')

    const router = createMemoryRouter(
      [{ path: '/', element: <MainLayout /> }],
      { initialEntries: ['/'] }
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