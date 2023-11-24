import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { apiCreateUser } from '../apiCreateUser'

vi.mock('firebase/auth')
vi.mock('firebase/firestore')

describe('apiCreateUser', () => {
  test('apiCreateUser call resolved', async () => {
    const signUpData = {
      email: 'userEmail',
      password: 'userPassword',
    }
    const defaultUserData = {
      userDapplets: [],
      userTags: [],
      userLists: [],
    }

    const mockedCreateUser = vi.mocked(createUserWithEmailAndPassword)
    const mockedDoc = vi.mocked(doc)
    const mockedSetDoc = vi.mocked(setDoc)

    mockedCreateUser.mockResolvedValue({
      user: { uid: 'testUserId' },
    } as unknown as UserCredential)

    await apiCreateUser(signUpData)

    expect(mockedCreateUser).toHaveBeenCalledTimes(1)
    expect(mockedCreateUser).toHaveBeenCalledWith(
      undefined,
      'userEmail',
      'userPassword',
    )

    expect(mockedDoc).toHaveBeenCalledTimes(1)
    expect(mockedDoc).toHaveBeenCalledWith(undefined, 'UsersData', 'testUserId')

    expect(mockedSetDoc).toHaveBeenCalledTimes(1)
    expect(mockedSetDoc).toHaveBeenCalledWith(undefined, defaultUserData)
  })
})
