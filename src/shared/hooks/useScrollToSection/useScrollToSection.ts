import { useCallback } from 'react'

type UseScrollToSectionOptions = {
  offset?: number
}

const useScrollToSection = (options: UseScrollToSectionOptions = {}) => {
  const { offset = 0 } = options

  const scrollTo = useCallback(
    (id: string) => {
      const element = document.getElementById(id)

      if (!element) {
        return
      }

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset

      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    },
    [offset]
  )

  return { scrollTo }
}

export default useScrollToSection