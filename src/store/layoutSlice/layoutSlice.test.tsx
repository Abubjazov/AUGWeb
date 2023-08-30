import { getInitialState } from './layoutSlice'

describe('layoutSlice', () => {
  test('getInitialState(): should return "true"', () => {
    expect(getInitialState(1200, 1100)).toBe(true)
  })

  test('getInitialState(): should return "false"', () => {
    expect(getInitialState(1200, 1201)).toBe(false)
  })
})
