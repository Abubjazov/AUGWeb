import { combineClasses } from './combineClasses'

describe('combineClasses()', () => {
  test('should return "string" from 0 items', () => {
    expect(combineClasses([])).toBe('')
  })

  test('should return "string" from 1 items', () => {
    expect(combineClasses(['class-1'])).toBe('class-1')
  })

  test('should return "string" from 2 items', () => {
    expect(combineClasses(['class-1', 'class-2'])).toBe('class-1 class-2')
  })

  test('should return "string" from 3 items', () => {
    expect(combineClasses(['class-1', 'class-2', 'class-3'])).toBe(
      'class-1 class-2 class-3',
    )
  })
})
