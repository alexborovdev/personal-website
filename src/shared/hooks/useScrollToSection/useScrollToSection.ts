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

    const header = document.getElementById('header')
    const headerOffset = header?.offsetHeight ?? 0

    const top =
      scrollTarget.getBoundingClientRect().top +
      window.scrollY -
      headerOffset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }, [locked])

  return { scrollTo }
}

export default useScrollToSection