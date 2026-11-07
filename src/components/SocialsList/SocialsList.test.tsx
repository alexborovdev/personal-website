// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import type { Social } from '@/shared/types/contacts'
import SocialsList from './SocialsList'

afterEach(() => cleanup())

const TestIcon = () => <svg aria-hidden="true" />

describe('SocialsList', () => {
  it('renders social links from the provided data', () => {
    const socials: Social[] = [
      {
        id: 'github',
        title: 'GitHub',
        label: 'Visit GitHub',
        href: 'https://github.com',
        icon: TestIcon
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        label: 'Visit LinkedIn',
        href: 'https://linkedin.com',
        icon: TestIcon
      }
    ]

    render(<SocialsList socials={socials} />)

    const list = screen.getByRole('list', {
      name: 'Social links'
    })

    const links = within(list).getAllByRole('link')

    expect(links).toHaveLength(2)
    expect(links[0].getAttribute('href')).toBe('https://github.com')
    expect(links[1].getAttribute('href')).toBe('https://linkedin.com')
  })
})