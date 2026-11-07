// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import HeaderContent from './HeaderContent'

vi.mock('@/assets/icons/logo.svg?react', () => ({
  default: () => <svg data-testid="logo" />
}))

vi.mock('@/shared/ui/LinkButton', () => ({
  default: ({
    children,
    onClick,
    ariaLabel
  }: {
    children: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
    ariaLabel: string
  }) => (
    <a href="#hero" aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  )
}))

vi.mock('@/components/MainNavigation', () => ({
  default: () => <nav data-testid="main-navigation" />
}))

vi.mock('@/components/MainSettings', () => ({
  default: () => <div data-testid="main-settings" />
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('HeaderContent', () => {
  const styles = {
    content: 'content',
    logo: 'logo',
    wrapper: 'wrapper'
  }

  it('renders header structure and child components', () => {
    render(
      <HeaderContent
        className="custom-header"
        styles={styles}
        scrollTo={vi.fn()}
      />
    )

    const header = document.querySelector('header')

    expect(header?.id).toBe('header')
    expect(header?.className).toBe('custom-header')

    expect(screen.getByRole('link', {
      name: 'Scroll to top'
    })).toBeDefined()

    expect(screen.getByTestId('logo')).toBeDefined()
    expect(screen.getByTestId('main-navigation')).toBeDefined()
    expect(screen.getByTestId('main-settings')).toBeDefined()
  })

  it('scrolls to hero when logo is clicked', () => {
    const scrollTo = vi.fn()

    render(
      <HeaderContent
        className="custom-header"
        styles={styles}
        scrollTo={scrollTo}
      />
    )

    fireEvent.click(screen.getByRole('link', {
      name: 'Scroll to top'
    }))

    expect(scrollTo).toHaveBeenCalledExactlyOnceWith('hero')
  })
})