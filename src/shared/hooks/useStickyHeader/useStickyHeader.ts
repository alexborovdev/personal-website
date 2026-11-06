import { useEffect, useState } from 'react'

const EXIT_ANIMATION_DURATION = 80

const useStickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isShowOut, setIsShowOut] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')

    if (!hero) return

    let timeout: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timeout)

        if (!entry.isIntersecting) {
          setIsShowOut(false)
          setIsSticky(true)
          return
        }

        setIsShowOut(true)

        timeout = setTimeout(() => {
          setIsSticky(false)
          setIsShowOut(false)
        }, EXIT_ANIMATION_DURATION)
      },
      { threshold: 0 }
    )

    observer.observe(hero)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  return { isSticky, isShowOut }
}

export default useStickyHeader