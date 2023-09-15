import { FC } from 'react'

import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './WelcomeModalContent.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomeModalContentProps {}

const WelcomeModalContent: FC<WelcomeModalContentProps> = () => {
  return (
    <div className={cc([styles.root])}>
      <span className={styles['title']}>My Lists</span>

      <div className={styles['list']}>
        <span className={styles['list-item']}>
          TOP-10 Twitter Dapplets (<a href="#">Me</a>)
        </span>

        <span className={styles['list-item']}>
          Best Financial dapplets by Jack (<a href="#">Jack</a>)
        </span>

        <span className={styles['list-item']}>
          TOP-10 Essentials Dapplets (<a href="#">Me</a>)
        </span>
      </div>
    </div>
  )
}

export default WelcomeModalContent
