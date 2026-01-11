import { useEffect, useRef } from 'react'

type Options = {
  rootMargin?: string
  step?: number
}

const DATA_ATTR = {
  animate: 'data-animate'
} as const

const STATE_CLASS = {
  visible: 'is-visible'
} as const

const CSS_VAR = {
  animationDelay: '--animation-delay'
} as const

const useAnimateOnScroll = (options: Options = {}) => {
  const {
    rootMargin = '0px 0px -6.66% 0px',
    step = 195
  } = options

  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const rootElement = elementRef.current

    if (!rootElement) {
      return
    }

    const animatedElements: HTMLElement[] = []

    if (rootElement.hasAttribute(DATA_ATTR.animate)) {
      animatedElements.push(rootElement)
    }

    animatedElements.push(
      ...rootElement.querySelectorAll<HTMLElement>(
        `[${DATA_ATTR.animate}]`
      )
    )

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        animatedElements.forEach((animatedElement, index) => {
          animatedElement.style.setProperty(
            CSS_VAR.animationDelay,
            `${index * step}ms`
          )
          animatedElement.classList.add(STATE_CLASS.visible)
        })

        rootElement.classList.add(STATE_CLASS.visible)
        observer.unobserve(rootElement)
      },
      { rootMargin }
    )

    observer.observe(rootElement)

    return () => observer.disconnect()
  }, [rootMargin, step])

  return (node: HTMLElement | null) => {
    elementRef.current = node
  }
}

export default useAnimateOnScroll