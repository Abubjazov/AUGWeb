import { formatWithCurrency } from './formatWithCurrency'

describe('formatWithCurrency()', () => {
  test('should return "string" from "689,598,789"', () => {
    expect(formatWithCurrency('689598789', '$')).toBe('689,598,789 $')
  })

  test('should return "string" from "689,598"', () => {
    expect(formatWithCurrency('689598', 'BTC')).toBe('689,598 BTC')
  })

  test('should return "string" from "N/A"', () => {
    expect(formatWithCurrency('N/A', 'BTC')).toBe('N/A')
  })

  test('should return "string" from "hfdgkhgfd" NaN', () => {
    expect(formatWithCurrency('hfdgkhgfd', 'TON')).toBe('hfdgkhgfd')
  })
})
