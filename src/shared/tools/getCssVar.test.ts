
import { afterEach, describe, expect, it, vi } from 'vitest'
import getCssVar from './getCssVar'

describe('getCssVar', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each([
    ['--color-accent', '  #ff0000  ', '#ff0000'],
    ['--bg-color', '\n rgb(0, 0, 0) \t', 'rgb(0, 0, 0)'],
    ['--missing', '', '']
  ])('returns trimmed value for %s', (name, value, expected) => {
    const getPropertyValue = vi.fn().mockReturnValue(value)
    const getComputedStyle = vi.fn().mockReturnValue({
      getPropertyValue
    })

    vi.stubGlobal('document', {
      documentElement: {}
    })
    vi.stubGlobal('getComputedStyle', getComputedStyle)

    expect(getCssVar(name)).toBe(expected)
    expect(getComputedStyle).toHaveBeenCalledWith(document.documentElement)
    expect(getPropertyValue).toHaveBeenCalledWith(name)
  })
})