import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth'

import { apiLogIn } from '../apiLogIn'

vi.mock('firebase/auth')

describe('apiLogIn', () => {
  test('apiLogIn call resolved', async () => {
    const signInData = {
      email: 'userEmail',
      password: 'userPassword',
    }

    const mockedSignIn = vi.mocked(signInWithEmailAndPassword)
    mockedSignIn.mockResolvedValue({ uid: 'uid' } as unknown as UserCredential)

    await apiLogIn(signInData)

    expect(mockedSignIn).toHaveBeenCalledTimes(1)
    expect(mockedSignIn).toHaveBeenCalledWith(
      undefined,
      'userEmail',
      'userPassword',
    )
  })
})
