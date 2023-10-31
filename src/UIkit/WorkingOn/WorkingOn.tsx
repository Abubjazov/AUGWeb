import { FC } from 'react'

import { nanoid } from 'nanoid'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './WorkingOn.module.css'

export interface WorkingOnProps {
  userStyles?: string
  dsOpened: boolean
}

const workingOnList = [
  { text: 'telegram.org', href: 'https://telegram.org/' },
  { text: 'whatsapp.com', href: 'https://www.whatsapp.com/' },
  { text: 'facebook.com', href: 'https://www.facebook.com/' },
  { text: 'twitter.com', href: 'https://twitter.com/' },
]

const WorkingOn: FC<WorkingOnProps> = ({ dsOpened, userStyles = '' }) => {
  return (
    <div
      className={cc([
        styles.root,
        dsOpened ? '' : styles['ds-closed'],
        userStyles,
      ])}
    >
      <span className={styles['title']}>Working on</span>

      <div className={styles['list']}>
        {workingOnList.map(service => (
          <div key={nanoid()} className={styles['list-item']}>
            <div className={styles['circle']}></div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={service.href}
              className={styles['list-item-text']}
            >
              {service.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkingOn
