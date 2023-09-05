import { renderHook } from '@testing-library/react'

import { useResize } from './useResize'

describe('useResize', () => {
  test('useResize(): should return "320"', () => {
    window.innerWidth = 320

    const { result } = renderHook(() => useResize())
    expect(result.current).toBe(320)
  })

  test('useResize(): should return "880"', () => {
    window.innerWidth = 880

    const { result } = renderHook(() => useResize())
    expect(result.current).toBe(880)
  })

  test('useResize(): should return "1200"', () => {
    window.innerWidth = 1200

    const { result } = renderHook(() => useResize())
    expect(result.current).toBe(1200)
  })

  test('useResize(): should return "0"', () => {
    window.innerWidth = 0

    const { result } = renderHook(() => useResize())
    expect(result.current).toBe(0)
  })

  test('useResize(): should return "-100"', () => {
    window.innerWidth = -100

    const { result } = renderHook(() => useResize())
    expect(result.current).toBe(-100)
  })
})
