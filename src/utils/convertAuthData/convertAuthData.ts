export interface UserData {
  token: string
  name: string
  email: string
}

export const convertAuthData = (
  authDataString: null | string,
): null | UserData =>
  authDataString ? (JSON.parse(authDataString) as UserData) : null
