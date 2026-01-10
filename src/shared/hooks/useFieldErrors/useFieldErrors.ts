type Params = {
  touched: Record<string, boolean | undefined>
  errors: Record<string, unknown>
  values: Record<string, string | undefined>
}

const useFieldErrors = ({ touched, errors, values }: Params) => {
  const hasValue = (value?: string) =>
    typeof value === 'string' && value.length > 0

  return Object.keys(values).reduce((acc, key) => {
    acc[key] = Boolean(
      touched[key] &&
      hasValue(values[key]) &&
      errors[key]
    )
    return acc
  }, {} as Record<string, boolean>)
}

export default useFieldErrors