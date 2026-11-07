// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import useTheme from './useTheme'

const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.querySelector('meta[name="theme-color"]')?.remove()
  })

  it('defaults to dark theme when no preference is stored', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#191820'
    )
  })

  it('restores light theme from localStorage', () => {
    localStorage.setItem('theme', 'light')

    const { result } = renderHook(() => useTheme(), {
      wrapper
    })

    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')

    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#FFFFFF'
    )
  })

  it('toggles theme and updates DOM and localStorage', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper
    })

    expect(result.current.theme).toBe('dark')

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#FFFFFF'
    )

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#191820'
    )
  })

  it('updates existing theme-color meta tag without duplicating it', () => {
    const metaTag = document.createElement('meta')
    metaTag.setAttribute('name', 'theme-color')
    metaTag.setAttribute('content', '#000000')
    document.head.appendChild(metaTag)

    const { result } = renderHook(() => useTheme(), {
      wrapper
    })

    expect(document.querySelectorAll('meta[name="theme-color"]')).toHaveLength(1)

    expect(metaTag.getAttribute('content')).toBe('#191820')

    act(() => {
      result.current.toggleTheme()
    })

    expect(document.querySelectorAll('meta[name="theme-color"]')).toHaveLength(1)

    expect(metaTag.getAttribute('content')).toBe('#FFFFFF')
  })

  it('falls back to dark when stored theme is invalid', () => {
    localStorage.setItem('theme', 'invalid-theme')

    const { result } = renderHook(() => useTheme(), {
      wrapper
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')

    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#191820'
    )
  })

  it('throws when useTheme is used outside the provider', () => {
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within ThemeProvider')
  })
})
