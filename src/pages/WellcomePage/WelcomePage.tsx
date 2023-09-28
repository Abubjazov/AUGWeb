import { FC } from 'react'

import StandardModal from 'components/StandardModal'
import WelcomeModalContent from 'components/WelcomeModalContent'
import { useAppSelector } from 'store/hooks'
import { Spinner } from 'uikit/Spinner/Spinner'

import styles from './WelcomePage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  const { isFirstLoading } = useAppSelector(state => state.auth)

  return (
    <main className={styles.root}>
      {isFirstLoading ? (
        <Spinner />
      ) : (
        <StandardModal welcomeMode modalContent={<WelcomeModalContent />} />
      )}
    </main>
  )
}

export default WelcomePage
