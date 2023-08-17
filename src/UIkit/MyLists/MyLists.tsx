import { FC } from 'react'

import { combineClasses as cc } from 'utils/combineClasses'

import styles from './MyLists.module.css'

interface MyListsProps {
  menuOpened: boolean
}

const MyLists: FC<MyListsProps> = ({ menuOpened }) => {
  return (
    <div className={cc([styles.root, menuOpened ? '' : styles['menu-closed']])}>
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

export default MyLists
