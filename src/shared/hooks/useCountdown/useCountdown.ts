import { useEffect, useState } from 'react'

const useCountdown = (
  seconds: number,
  isActive: boolean,
  onFinish: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (!isActive) {
      return
    }

    setTimeLeft(seconds)

    const interval = setInterval(() => {
      setTimeLeft((prevState) => {
        if (prevState <= 1) {
          clearInterval(interval)
          onFinish()
          return 0
        }
        return prevState - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, seconds, onFinish])

  return timeLeft
}

export default useCountdown