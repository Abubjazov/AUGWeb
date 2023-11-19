import { renderHook } from '@testing-library/react'

import { useInput } from './useInput'

describe('useInput', () => {
  const testValidators = {
    isEmpty: { value: true, message: 'Test value required' },
    isEmail: { value: true, message: 'Please enter a correct email' },
    isValueMatched: {
      value: true,
      comparisonValue: 'testword@example.tst',
      message: 'isTestValueMatched',
    },
    minLength: { value: 2, message: 'minLengthError' },
    maxLength: { value: 6, message: 'maxLengthError' },
  }

  test('useInput(): should return errors 1', () => {
    const testValue = ''

    const { result } = renderHook(() => useInput(testValue, testValidators))

    expect(result.current.isEmpty.isEmpty).toBe(true)
    expect(result.current.isEmail.isEmail).toBe(true)
    expect(result.current.isValueMatched.isValueMatched).toBe(true)
    expect(result.current.minLengthError.minLengthError).toBe(false)
    expect(result.current.maxLengthError.maxLengthError).toBe(false)
  })

  test('useInput(): should return errors 2', () => {
    const testValue = 't'

    const { result } = renderHook(() => useInput(testValue, testValidators))

    expect(result.current.isEmpty.isEmpty).toBe(false)
    expect(result.current.isEmail.isEmail).toBe(true)
    expect(result.current.isValueMatched.isValueMatched).toBe(true)
    expect(result.current.minLengthError.minLengthError).toBe(true)
    expect(result.current.maxLengthError.maxLengthError).toBe(false)
  })

  test('useInput(): should return errors 3', () => {
    const testValue = 'te'

    const { result } = renderHook(() => useInput(testValue, testValidators))

    expect(result.current.isEmpty.isEmpty).toBe(false)
    expect(result.current.isEmail.isEmail).toBe(true)
    expect(result.current.isValueMatched.isValueMatched).toBe(true)
    expect(result.current.minLengthError.minLengthError).toBe(false)
    expect(result.current.maxLengthError.maxLengthError).toBe(false)
  })

  test('useInput(): should return errors 3', () => {
    const testValue = 'testword@example.tst'

    const { result } = renderHook(() => useInput(testValue, testValidators))

    expect(result.current.isEmpty.isEmpty).toBe(false)
    expect(result.current.isEmail.isEmail).toBe(false)
    expect(result.current.isValueMatched.isValueMatched).toBe(false)
    expect(result.current.minLengthError.minLengthError).toBe(false)
    expect(result.current.maxLengthError.maxLengthError).toBe(true)
  })
})
