import { FC } from 'react'

import { useAppSelector } from 'store/hooks'
import Snackbar from 'uikit/Snackbar'

import styles from './MessageArea.module.css'

export interface MessageAreaProps {
  showMode?: boolean
}

const MessageArea: FC<MessageAreaProps> = ({ showMode }) => {
  const { messages } = useAppSelector(state => state.layout)

  return (
    <div className={styles['root']}>
      {messages.map(message => (
        <Snackbar
          key={message.messageId}
          message={message}
          showMode={showMode}
        />
      ))}
    </div>
  )
}

export default MessageArea
