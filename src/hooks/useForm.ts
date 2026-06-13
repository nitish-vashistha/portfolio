import { useCallback, useState } from 'react'

type Validators<T> = {
  [K in keyof T]?: (value: T[K], values: T) => string | undefined
}

export type FormErrors<T> = Partial<Record<keyof T, string>>
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * A small, fully generic, dependency-free form hook:
 * typed values, per-field validators, touched tracking and submit lifecycle.
 */
export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validators: Validators<T>,
  onSubmit: (values: T) => Promise<void> | void,
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validateField = useCallback(
    <K extends keyof T>(name: K, value: T[K], all: T) => validators[name]?.(value, all),
    [validators],
  )

  const setValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value }
        setErrors((e) => ({ ...e, [name]: validateField(name, value, next) }))
        return next
      })
    },
    [validateField],
  )

  const onBlur = useCallback((name: keyof T) => {
    setTouched((t) => ({ ...t, [name]: true }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const nextErrors: FormErrors<T> = {}
      for (const key of Object.keys(values) as (keyof T)[]) {
        const error = validateField(key, values[key], values)
        if (error) nextErrors[key] = error
      }
      setErrors(nextErrors)
      setTouched(
        Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Record<keyof T, boolean>,
      )
      if (Object.keys(nextErrors).length > 0) {
        setStatus('error')
        return
      }
      setStatus('submitting')
      try {
        await onSubmit(values)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    },
    [values, validateField, onSubmit],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }, [initialValues])

  return { values, errors, touched, status, setValue, onBlur, handleSubmit, reset }
}
