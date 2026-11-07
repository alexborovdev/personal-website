// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavigationItem from './NavigationItem'
import styles from './NavigationItem.module.scss'

afterEach(() => {
  cleanup()
})

describe('NavigationItem', () => {
  it('renders an inactive navigation item', () => {
    render(
      <ul>
        <NavigationItem
          label="About"
          href="#about"
          title="Go to About section"
          isActive={false}
          onClick={vi.fn()}
        />
      </ul>
    )

    const link = screen.getByRole('link', {
      name: 'Go to About section'
    })

    expect(link.textContent).toBe('About')
    expect(link.getAttribute('href')).toBe('#about')
    expect(link.getAttribute('title')).toBe('Go to About section')
    expect(link.hasAttribute('aria-current')).toBe(false)
  })

  it('marks the navigation item as active', () => {
    render(
      <ul>
        <NavigationItem
          label="Skills"
          href="#skills"
          title="Go to Skills section"
          isActive={true}
          onClick={vi.fn()}
        />
      </ul>
    )

    const link = screen.getByRole('link', {
      name: 'Go to Skills section'
    })

    expect(link.getAttribute('aria-current')).toBe('true')
    expect(link.classList.contains(styles.active)).toBe(true)
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <ul>
        <NavigationItem
          label="About"
          href="#about"
          title="Go to About section"
          isActive={false}
          onClick={handleClick}
        />
      </ul>
    )

    const link = screen.getByRole('link', {
      name: 'Go to About section'
    })

    await user.click(link)

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
