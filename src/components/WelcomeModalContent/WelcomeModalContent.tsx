import { FC } from 'react'

import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './WelcomeModalContent.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomeModalContentProps {}

const WelcomeModalContent: FC<WelcomeModalContentProps> = () => {
  return (
    <div className={cc([styles.root])}>
      <span className={styles.title}>Welcome</span>

      <span className={styles.text}>
        We are building an Augmented Web platform consisting of a browser-based
        plugin and decentralized applications (dapplets) based on crypto
        technologies.
      </span>

      <span className={styles.text}>
        Our platform is created on an open-source basis and is available to
        developers from all over the world.
      </span>

      <div className={styles.buttons}>
        <BaseButton
          label={'Registration'}
          mode={BaseButtonMode.CONTAINED_RED}
        />

        <BaseButton label={'LogIn'} />
      </div>
    </div>
  )
}

export default WelcomeModalContent
