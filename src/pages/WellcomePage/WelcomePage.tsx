import { FC } from 'react'

import MessageArea from 'components/MessageArea'
import StandardModal from 'components/StandardModal'
import WelcomeModalContent from 'components/WelcomeModalContent'

import styles from './WelcomePage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  return (
    <main className={styles.root}>
      <StandardModal welcomeMode modalContent={<WelcomeModalContent />} />
      <MessageArea />
    </main>
  )
}

export default WelcomePage
