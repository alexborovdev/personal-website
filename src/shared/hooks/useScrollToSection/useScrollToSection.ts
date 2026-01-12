import { useCallback, useEffect } from 'react'

const useScrollToSection = (locked = false) => {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : ''
  }, [locked])

  const scrollTo = useCallback((id: string) => {
    if (locked) {
      return
    }

    const scrollTarget = document.getElementById(id)
    if (!scrollTarget) {
      return
    }

    if (id === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      return
    }

    const top =
      scrollTarget.getBoundingClientRect().top +
      window.scrollY

    window.scrollTo({
      top,
      behavior: 'smooth',
    })

    if (!scrollTarget.hasAttribute('tabindex')) {
      scrollTarget.setAttribute('tabindex', '-1')
    }

    scrollTarget.focus({ preventScroll: true })
  }, [locked])

  return { scrollTo }
}

export default useScrollToSection