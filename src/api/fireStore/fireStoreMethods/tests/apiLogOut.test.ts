import { signOut } from 'firebase/auth'

import { apiLogOut } from '../apiLogOut'

vi.mock('firebase/auth')

describe('apiLogOut', () => {
  test('apiLogOut call resolved', async () => {
    const mockedSignOut = vi.mocked(signOut)
    mockedSignOut.mockResolvedValue()

    await apiLogOut()

    expect(mockedSignOut).toHaveBeenCalledTimes(1)
  })
})
