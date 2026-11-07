// @vitest-environment jsdom

import type { SVGProps } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SocialItem from './SocialItem'

const MockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="social-icon"
    {...props}
  />
)

afterEach(() => {
  cleanup()
})

describe('SocialItem', () => {
  it('renders an accessible external link with an icon', () => {
    render(
      <ul>
        <SocialItem
          href="https://github.com/example"
          title="Visit GitHub"
          label="GitHub profile"
          Icon={MockIcon}
        />
      </ul>
    )

    const link = screen.getByRole('link', {
      name: 'GitHub profile'
    })

    expect(link.getAttribute('href')).toBe('https://github.com/example')
    expect(link.getAttribute('title')).toBe('Visit GitHub')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    expect(screen.getByTestId('social-icon')).toBeTruthy()
  })

  it('applies custom classes to the list item and link', () => {
    render(
      <ul>
        <SocialItem
          href="https://github.com/example"
          title="Visit GitHub"
          label="GitHub profile"
          Icon={MockIcon}
          itemClassName="custom-item"
          linkClassName="custom-link"
        />
      </ul>
    )

    const link = screen.getByRole('link', {
      name: 'GitHub profile'
    })

    const listItem = link.closest('li')

    expect(listItem?.classList.contains('custom-item')).toBe(true)
    expect(link.classList.contains('custom-link')).toBe(true)
  })
})
