import { useState } from 'react'

type ShakeFields = Record<string, boolean>

type Params = {
  duration?: number
}

const useShakeOnError = (options?: Params) => {
  const { duration = 400 } = options || {}

  const [shakeFields, setShakeFields] = useState<ShakeFields>({})

  const triggerShake = (fields: string[]) => {
    if (fields.length === 0) return

    const shakeMap: ShakeFields = {}

    fields.forEach((field) => {
      shakeMap[field] = true
    })

    setShakeFields(shakeMap)

    setTimeout(() => {
      setShakeFields({})
    }, duration)
  }

  return {
    shakeFields,
    triggerShake
  }
}

export default useShakeOnError