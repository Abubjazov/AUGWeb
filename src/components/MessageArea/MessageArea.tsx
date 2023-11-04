import { FC } from 'react'

import { useAppSelector } from 'store/hooks'
import Snackbar from 'uikit/Snackbar'

import styles from './MessageArea.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MessageAreaProps {}

const MessageArea: FC<MessageAreaProps> = () => {
  const { messages } = useAppSelector(state => state.layout)

  return (
    <div className={styles['root']}>
      {messages.map(message => (
        <Snackbar key={message.messageId} message={message} />
      ))}
    </div>
  )
}

export default MessageArea
