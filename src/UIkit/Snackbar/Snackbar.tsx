import { FC, useEffect } from 'react'

import { useAppDispatch } from 'store/hooks'
import { IMessage, removeMessage } from 'store/slices/layoutSlice'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './Snackbar.module.css'

export interface SnackbarProps {
  userStyles?: string
  message: IMessage
}

const Snackbar: FC<SnackbarProps> = ({ userStyles = '', message }) => {
  const dispatch = useAppDispatch()

  const { messageId, messageText, messageType } = message

  const closeSnackBar = () => {
    dispatch(removeMessage(messageId))
  }

  useEffect(() => {
    const removeSnackBar = setTimeout(
      () => dispatch(removeMessage(messageId)),
      3500,
    )

    return () => clearTimeout(removeSnackBar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      data-testid="snackbar"
      className={cc([styles.root, styles[messageType], userStyles])}
      onClick={closeSnackBar}
    >
      <span className={styles['title']}>{messageText}</span>
    </div>
  )
}

export default Snackbar
