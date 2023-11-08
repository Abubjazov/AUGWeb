import { getErrorMessage } from './getErrorMessage'

describe('getDate()', () => {
  test('should return "error message" from "undefined"', () => {
    expect(getErrorMessage(undefined)).toBe('Sorry, an unknown error occurred')
  })

  test('should return "error message" from "{message: "some error message"}"', () => {
    expect(getErrorMessage({ message: 'some error message' })).toBe(
      'some error message',
    )
  })

  test('should return "error message" from "{message: "Firebase: Error (auth/email-already-in-use)."}"', () => {
    expect(
      getErrorMessage({
        message: 'Firebase: Error (auth/email-already-in-use).',
      }),
    ).toBe('This email address is already taken')
  })
})
