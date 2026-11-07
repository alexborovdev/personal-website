// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import HomePage from './HomePage'

vi.mock('@/sections/Hero', () => ({
  default: () => <section data-testid="hero" />
}))

vi.mock('@/sections/Skills', () => ({
  default: () => <section data-testid="skills" />
}))

vi.mock('@/sections/Portfolio', () => ({
  default: () => <section data-testid="portfolio" />
}))

vi.mock('@/sections/Contacts', () => ({
  default: () => <section data-testid="contacts" />
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('HomePage', () => {
  it('renders all sections in the correct order', () => {
    const { container } = render(<HomePage />)

    const main = container.querySelector('main')
    const sections = main?.querySelectorAll('section')

    expect(container.querySelectorAll('main')).toHaveLength(1)

    expect(
      Array.from(sections ?? []).map(section =>
        section.getAttribute('data-testid')
      )
    ).toEqual(['hero', 'skills', 'portfolio', 'contacts'])
  })
})