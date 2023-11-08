import { getInitialState } from './getInItialState'

describe('getInitialState()', () => {
  test('should return "true"', () => {
    expect(getInitialState(1200, 1100)).toBe(true)
  })

  test('should return "true"', () => {
    expect(getInitialState(1200, 1200)).toBe(true)
  })

  test('should return "false"', () => {
    expect(getInitialState(1200, 1201)).toBe(false)
  })
})
