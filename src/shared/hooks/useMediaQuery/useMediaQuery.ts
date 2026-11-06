import { useCallback, useSyncExternalStore } from 'react'

const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query)

      media.addEventListener('change', callback)

      return () => media.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = () => window.matchMedia(query).matches

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false
  )
}

export default useMediaQuery