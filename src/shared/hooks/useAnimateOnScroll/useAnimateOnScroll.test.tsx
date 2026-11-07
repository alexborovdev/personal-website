// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import useAnimateOnScroll from './useAnimateOnScroll'

const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()

let observerCallback: IntersectionObserverCallback

const intersectionObserverMock = vi.fn(function (
  this: IntersectionObserver,
  callback: IntersectionObserverCallback
) {
  observerCallback = callback
  this.observe = observe
  this.unobserve = unobserve
  this.disconnect = disconnect
})

const TestComponent = ({
  options = {},
  animateRoot = false
}: {
  options?: Parameters<typeof useAnimateOnScroll>[0]
  animateRoot?: boolean
}) => {
  const ref = useAnimateOnScroll(options)

  return (
    <section
      ref={ref}
      data-animate={animateRoot ? '' : undefined}
    >
      <div data-animate>First</div>
      <div data-animate>Second</div>
    </section>
  )
}

describe('useAnimateOnScroll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('IntersectionObserver', intersectionObserverMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('observes the root element with default options', () => {
    const { container } = render(<TestComponent />)
    const root = container.querySelector('section')

    expect(intersectionObserverMock).toHaveBeenCalledOnce()
    expect(intersectionObserverMock).toHaveBeenCalledWith(expect.any(Function), {
      rootMargin: '0px 0px -6.66% 0px'
    })

    expect(observe).toHaveBeenCalledExactlyOnceWith(root)
  })

  it('animates elements when the root intersects', () => {
    const { container } = render(<TestComponent />)

    const root = container.querySelector('section')!
    const elements = root.querySelectorAll<HTMLElement>('[data-animate]')

    act(() => {
      observerCallback(
        [
          {
            target: root,
            isIntersecting: true
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(root.classList.contains('is-visible')).toBe(true)

    expect(elements[0].classList.contains('is-visible')).toBe(true)
    expect(elements[1].classList.contains('is-visible')).toBe(true)

    expect(elements[0].style.getPropertyValue('--animation-delay')).toBe('0ms')
    expect(elements[1].style.getPropertyValue('--animation-delay')).toBe('195ms')

    expect(unobserve).toHaveBeenCalledExactlyOnceWith(root)
  })

  it('does not animate when the root is not intersecting', () => {
    const { container } = render(<TestComponent />)

    const root = container.querySelector('section')!
    const elements = root.querySelectorAll<HTMLElement>('[data-animate]')

    act(() => {
      observerCallback(
        [
          {
            target: root,
            isIntersecting: false
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(root.classList.contains('is-visible')).toBe(false)

    elements.forEach(element => {
      expect(element.classList.contains('is-visible')).toBe(false)
      expect(element.style.getPropertyValue('--animation-delay')).toBe('')
    })

    expect(unobserve).not.toHaveBeenCalled()
  })

  it('uses custom rootMargin and animation step', () => {
    const { container } = render(<TestComponent options={{ rootMargin: '-20% 0px', step: 100 }} />)

    const root = container.querySelector('section')!
    const elements = root.querySelectorAll<HTMLElement>('[data-animate]')

    expect(intersectionObserverMock).toHaveBeenCalledWith(expect.any(Function), {
      rootMargin: '-20% 0px'
    })

    act(() => {
      observerCallback(
        [
          {
            target: root,
            isIntersecting: true
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(elements[0].style.getPropertyValue('--animation-delay')).toBe('0ms')
    expect(elements[1].style.getPropertyValue('--animation-delay')).toBe('100ms')
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<TestComponent />)

    expect(disconnect).not.toHaveBeenCalled()

    unmount()

    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('includes the root in animation sequence when it has data-animate', () => {
    const { container } = render(<TestComponent animateRoot />)

    const root = container.querySelector('section')!
    const elements = root.querySelectorAll<HTMLElement>('[data-animate]')

    root.setAttribute('data-animate', '')

    act(() => {
      observerCallback(
        [
          {
            target: root,
            isIntersecting: true
          } as unknown as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(root.style.getPropertyValue('--animation-delay')).toBe('0ms')
    expect(elements[0].style.getPropertyValue('--animation-delay')).toBe('195ms')
    expect(elements[1].style.getPropertyValue('--animation-delay')).toBe('390ms')
  })
})
