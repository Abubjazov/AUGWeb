import { getDate } from './getDate'

describe('getDate()', () => {
  test('should return "local date string" from "1699454174" Unix Timestamp', () => {
    expect(getDate('1699454174')).not.toBe('N/A')
  })

  test('should return "local date string" from "N/A" not available', () => {
    expect(getDate('N/A')).toBe('N/A')
  })

  test('should return "local date string" from "hfdgkhgfd" NaN', () => {
    expect(getDate('hfdgkhgfd')).toBe('hfdgkhgfd')
  })
})
