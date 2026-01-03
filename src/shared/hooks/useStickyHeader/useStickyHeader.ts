import { useEffect, useState } from 'react'

const EXIT_ANIMATION_DURATION = 80

const useStickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isShowOut, setIsShowOut] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')

    if (!hero) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsShowOut(false)
          setIsSticky(true)
          return
        }

        setIsShowOut(true)

        const timeout = setTimeout(() => {
          setIsSticky(false)
          setIsShowOut(false)
        }, EXIT_ANIMATION_DURATION)

        return () => clearTimeout(timeout)
      },
      { threshold: 0 }
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return { isSticky, isShowOut }
}

export default useStickyHeader