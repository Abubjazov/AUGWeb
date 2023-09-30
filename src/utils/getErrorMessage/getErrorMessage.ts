export const getErrorMessage = (error: unknown) =>
  typeof error == 'object' && !!error && 'message' in error
    ? (error.message as string)
    : 'Sorry, an unknown error occurred'
