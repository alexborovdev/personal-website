import { useCallback } from 'react'

const useScrollToSection = () => {
  const scrollTo = useCallback((id: string) => {
    const scrollTarget = document.getElementById(id)

    if (!scrollTarget) {
      return
    }

    const header = document.getElementById('header')
    const headerOffset = header?.offsetHeight ?? 0

    const scrollTargetTop =
      scrollTarget.getBoundingClientRect().top +
      window.scrollY -
      headerOffset

    window.scrollTo({
      top: scrollTargetTop,
      behavior: 'smooth',
    })
  }, [])

  return { scrollTo }
}

export default useScrollToSection