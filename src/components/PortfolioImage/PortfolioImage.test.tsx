// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import type { ProjectImage } from '@/shared/types/projects'
import PortfolioImage from './PortfolioImage'

afterEach(() => cleanup())

describe('PortfolioImage', () => {
  it('renders an accessible image linked to its full size', () => {
    const image: ProjectImage = {
      src: '/images/personal-website.webp',
      alt: 'Personal Website screenshot'
    }

    render(<PortfolioImage image={image} />)

    const link = screen.getByRole('link', {
      name: 'Open full size image'
    })

    const img = screen.getByRole('img', {
      name: image.alt
    })

    expect(link.getAttribute('href')).toBe(image.src)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')

    expect(img.getAttribute('src')).toBe(image.src)
    expect(img.getAttribute('loading')).toBe('lazy')
    expect(img.getAttribute('width')).toBe('540')
    expect(img.getAttribute('height')).toBe('320')
  })
})