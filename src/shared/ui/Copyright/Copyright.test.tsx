// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Copyright from './Copyright'

afterEach(() => cleanup())

describe('Copyright', () => {
  it('renders copyright text using a small element', () => {
    const { container } = render(
      <Copyright text="2026 Alex Borov" />
    )

    const copyright = container.querySelector('small')

    expect(copyright?.textContent).toBe('© 2026 Alex Borov')
  })
})