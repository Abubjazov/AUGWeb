enum EErrorMessages {
  FB_INVALID_LOGIN_CREDENTIALS = 'Firebase: Error (auth/invalid-login-credentials).',
  FB_EMAIL_ALREDY_IN_USE = 'Firebase: Error (auth/email-already-in-use).',
}

const errorMessages: { [key in EErrorMessages]: string } = {
  [EErrorMessages.FB_INVALID_LOGIN_CREDENTIALS]: 'Incorrect login or password',
  [EErrorMessages.FB_EMAIL_ALREDY_IN_USE]:
    'This email address is already taken',
}

export const getErrorMessage = (error: unknown) => {
  if (!(typeof error == 'object' && !!error && 'message' in error)) {
    return 'Sorry, an unknown error occurred'
  }

  const errMsg = error.message as EErrorMessages

  return Object.values(EErrorMessages).includes(errMsg)
    ? errorMessages[errMsg]
    : errMsg
}
