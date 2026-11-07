// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import TechnologyItem from './TechnologyItem'

afterEach(() => {
  cleanup()
})

describe('TechnologyItem', () => {
  it('renders a technology icon with correct attributes', () => {
    render(
      <ul>
        <TechnologyItem
          technology={{
            name: 'React',
            icon: '/react.svg'
          }}
          itemClassName="tech-item"
          imageClassName="tech-image"
        />
      </ul>
    )

    const item = screen.getByRole('listitem')
    const image = screen.getByRole('img', { name: 'React' })

    expect(image.getAttribute('src')).toBe('/react.svg')
    expect(image.getAttribute('title')).toBe('React')
    expect(image.getAttribute('width')).toBe('32')
    expect(image.getAttribute('height')).toBe('32')
    expect(image.getAttribute('loading')).toBe('lazy')

    expect(item.classList.contains('tech-item')).toBe(true)
    expect(image.classList.contains('tech-image')).toBe(true)
  })
})