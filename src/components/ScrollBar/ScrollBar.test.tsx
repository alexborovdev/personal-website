// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import useScrollBar from '@/shared/hooks/useScrollBar'
import ScrollBar from './ScrollBar'

vi.mock('@/shared/hooks/useMediaQuery')
vi.mock('@/shared/hooks/useScrollBar')

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('ScrollBar', () => {
  it('renders scroll progress on desktop', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    vi.mocked(useScrollBar).mockReturnValue(0.5)

    const { container } = render(<ScrollBar />)

    const track = container.firstElementChild
    const indication = track?.firstElementChild as HTMLElement

    expect(track?.getAttribute('aria-hidden')).toBe('true')
    expect(indication.style.transform).toBe('scaleY(0.5)')

    expect(useMediaQuery).toHaveBeenCalledWith(
      '(min-width: 768px)'
    )
  })

  it('does not render on mobile', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    vi.mocked(useScrollBar).mockReturnValue(0.5)

    const { container } = render(<ScrollBar />)

    expect(container.firstElementChild).toBeNull()
  })
})