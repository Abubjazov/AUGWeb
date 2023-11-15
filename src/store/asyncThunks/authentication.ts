import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiCreateUser,
  apiLogIn,
  apiLogOut,
} from 'api/fireStore/fireStoreMethods'
import { ISignUpData, setIsInProgress } from 'store/slices/authSlice'
import { EMessageType, addMessage } from 'store/slices/layoutSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data: ISignUpData, { dispatch }) => {
    try {
      dispatch(setIsInProgress(true))

      await apiCreateUser(data)
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    } finally {
      dispatch(setIsInProgress(false))
    }
  },
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data: ISignUpData, { dispatch }) => {
    try {
      dispatch(setIsInProgress(true))

      await apiLogIn(data)
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    } finally {
      dispatch(setIsInProgress(false))
    }
  },
)

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsInProgress(true))

      await apiLogOut()
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    } finally {
      dispatch(setIsInProgress(false))
    }
  },
)
