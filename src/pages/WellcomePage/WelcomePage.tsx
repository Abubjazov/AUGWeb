import { FC } from 'react'

import StandardModal from 'components/StandardModal'
// import WelcomeModalContent from 'components/WelcomeModalContent'

import styles from './WelcomePage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  return (
    <main className={styles.root}>
      <StandardModal welcomeMode />
    </main>
  )
}

export default WelcomePage
