import { useEffect } from 'react'
import useScrollDirection from '@/shared/hooks/useScrollDirection'

type Params = {
  rootMargin?: string
  step?: number
}

const useAnimateOnScroll = (
  ref: React.RefObject<HTMLElement>,
  {
    rootMargin = '0px 0px -20% 0px',
    step = 80
  }: Params = {}
) => {
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const items = ref.current.querySelectorAll<HTMLElement>(
      '[data-animate]'
    )

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            items.forEach(item => item.classList.remove('is-animated'))
            return
          }

          const ordered =
            scrollDirection.current === 'down'
              ? [...items]
              : [...items].reverse()

          ordered.forEach((element, index) => {
            element.style.transitionDelay = `${index * step}ms`
            element.classList.add('is-animated')
          })
        })
      },
      { rootMargin }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, rootMargin, step, scrollDirection])
}

export default useAnimateOnScroll