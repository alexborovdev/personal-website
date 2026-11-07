// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SkillItem from './SkillItem'

afterEach(() => {
  cleanup()
})

describe('SkillItem', () => {
  it('renders the skill with an animation marker', () => {
    render(
      <ul>
        <SkillItem skill="TypeScript" />
      </ul>
    )

    const item = screen.getByRole('listitem')

    expect(item.textContent).toBe('TypeScript')
    expect(item.hasAttribute('data-animate')).toBe(true)
  })
})