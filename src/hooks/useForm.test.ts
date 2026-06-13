import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useForm } from './useForm'

const validators = {
  name: (v: string) => (v.length < 2 ? 'too short' : undefined),
  email: (v: string) => (!v.includes('@') ? 'invalid' : undefined),
}

const submitEvent = () => ({ preventDefault: vi.fn() }) as unknown as React.FormEvent

describe('useForm', () => {
  it('validates fields as they change', () => {
    const { result } = renderHook(() =>
      useForm({ name: '', email: '' }, validators, vi.fn()),
    )

    act(() => result.current.setValue('name', 'N'))
    expect(result.current.errors.name).toBe('too short')

    act(() => result.current.setValue('name', 'Nitish'))
    expect(result.current.errors.name).toBeUndefined()
  })

  it('blocks submit while invalid and surfaces all errors', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm({ name: '', email: '' }, validators, onSubmit),
    )

    await act(async () => result.current.handleSubmit(submitEvent()))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(result.current.status).toBe('error')
    expect(result.current.errors).toEqual({ name: 'too short', email: 'invalid' })
    expect(result.current.touched).toEqual({ name: true, email: true })
  })

  it('submits valid values and reaches success state', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() =>
      useForm({ name: 'Nitish', email: 'n@v.dev' }, validators, onSubmit),
    )

    await act(async () => result.current.handleSubmit(submitEvent()))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Nitish', email: 'n@v.dev' })
    expect(result.current.status).toBe('success')
  })

  it('reset returns the form to a pristine state', async () => {
    const { result } = renderHook(() =>
      useForm({ name: '', email: '' }, validators, vi.fn()),
    )
    await act(async () => result.current.handleSubmit(submitEvent()))
    act(() => result.current.reset())

    expect(result.current.status).toBe('idle')
    expect(result.current.errors).toEqual({})
  })
})
