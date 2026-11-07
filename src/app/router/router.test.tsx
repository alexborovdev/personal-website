// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom'
import { routes } from './router'

vi.mock('@/app/layouts/MainLayout', () => ({
  default: () => (
    <div data-testid="main-layout">
      <Outlet />
    </div>
  )
}))

vi.mock('@/app/layouts/NotFoundLayout', () => ({
  default: () => (
    <div data-testid="not-found-layout">
      <Outlet />
    </div>
  )
}))

vi.mock('@/pages/HomePage', () => ({
  default: () => <div>Home Page</div>
}))

vi.mock('@/pages/NotFoundPage', () => ({
  default: () => <div>Not Found Page</div>
}))

describe('router', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders HomePage inside MainLayout for /', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByText('Home Page')).toBeTruthy()
    expect(screen.getByTestId('main-layout')).toBeTruthy()
    expect(screen.queryByTestId('not-found-layout')).toBeNull()
  })

  it('renders NotFoundPage inside NotFoundLayout for unknown routes', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/some-random-page']
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByText('Not Found Page')).toBeTruthy()
    expect(screen.getByTestId('not-found-layout')).toBeTruthy()
    expect(screen.queryByTestId('main-layout')).toBeNull()
  })
})
