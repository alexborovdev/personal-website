import { beforeEach, describe, expect, it, vi } from 'vitest'
import createParticlesConfig from './particles'
import getCssVar from '@/shared/tools/getCssVar'

vi.mock('@/shared/tools/getCssVar', () => ({
  default: vi.fn()
}))

const mockedGetCssVar = vi.mocked(getCssVar)

describe('createParticlesConfig', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('uses CSS accent color for particles and links', () => {
    mockedGetCssVar.mockReturnValue('#ff5500')

    const config = createParticlesConfig()

    expect(getCssVar).toHaveBeenCalledExactlyOnceWith('--color-accent')
    expect(config).toMatchObject({
      particles: {
        color: { value: '#ff5500' },
        links: { color: '#ff5500' }
      }
    })
  })

  it('generates a new config with the current accent color', () => {
    mockedGetCssVar.mockReturnValueOnce('#ff5500').mockReturnValueOnce('#00aaff')

    const first = createParticlesConfig()
    const second = createParticlesConfig()

    expect(first).not.toBe(second)
    expect(first).toMatchObject({
      particles: { color: { value: '#ff5500' } }
    })
    expect(second).toMatchObject({
      particles: { color: { value: '#00aaff' } }
    })
  })
})
