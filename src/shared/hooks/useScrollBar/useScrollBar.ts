import { useEffect, useState } from 'react'

const useScrollBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const value = documentHeight > 0
        ? scrollTop / documentHeight
        : 0

      setProgress(Math.min(1, Math.max(0, value)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

export default useScrollBar