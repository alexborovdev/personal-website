// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useResetSubmitState from './useResetSubmitState'

describe('useResetSubmitState', () => {
  it('does not reset on initial render', () => {
    const onReset = vi.fn()

    renderHook(() =>
      useResetSubmitState({
        values: ['Alex', 'alex@example.com'],
        submitResult: 'error',
        isSubmitting: false,
        onReset
      })
    )

    expect(onReset).not.toHaveBeenCalled()
  })

  it('does not reset when only submitResult changes', () => {
    const onReset = vi.fn()

    const { rerender } = renderHook(
      ({ submitResult }: { submitResult: 'idle' | 'success' | 'error' }) =>
        useResetSubmitState({
          values: ['Alex', 'alex@example.com'],
          submitResult,
          isSubmitting: false,
          onReset
        }),
      {
        initialProps: {
          submitResult: 'idle' as 'idle' | 'success' | 'error'
        }
      }
    )

    rerender({ submitResult: 'error' })

    expect(onReset).not.toHaveBeenCalled()
  })

  it('resets when a field value changes after an error', () => {
    const onReset = vi.fn()

    const { rerender } = renderHook(
      ({ value }) =>
        useResetSubmitState({
          values: [value],
          submitResult: 'error',
          isSubmitting: false,
          onReset
        }),
      {
        initialProps: { value: 'invalid-email' }
      }
    )

    expect(onReset).not.toHaveBeenCalled()

    rerender({ value: 'alex@example.com' })

    expect(onReset).toHaveBeenCalledOnce()

    rerender({ value: 'alex@example.com' })

    expect(onReset).toHaveBeenCalledOnce()
  })

  it('does not reset while submitting', () => {
    const onReset = vi.fn()

    const { rerender } = renderHook(
      ({ value }) =>
        useResetSubmitState({
          values: [value],
          submitResult: 'error',
          isSubmitting: true,
          onReset
        }),
      {
        initialProps: { value: 'Alex' }
      }
    )

    rerender({ value: 'Alexander' })

    expect(onReset).not.toHaveBeenCalled()
  })

  it('does not reset when disabled', () => {
    const onReset = vi.fn()

    const { rerender } = renderHook(
      ({ value }) =>
        useResetSubmitState({
          values: [value],
          submitResult: 'error',
          isSubmitting: false,
          disabled: true,
          onReset
        }),
      {
        initialProps: { value: 'Alex' }
      }
    )

    rerender({ value: 'Alexander' })

    expect(onReset).not.toHaveBeenCalled()
  })

  it('does not reset when submitResult is idle', () => {
    const onReset = vi.fn()

    const { rerender } = renderHook(
      ({ value }) =>
        useResetSubmitState({
          values: [value],
          submitResult: 'idle',
          isSubmitting: false,
          onReset
        }),
      {
        initialProps: { value: 'Alex' }
      }
    )

    rerender({ value: 'Alexander' })

    expect(onReset).not.toHaveBeenCalled()
  })
})
