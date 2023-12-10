import { FC } from 'react'

import styles from './NotAvailable.module.css'

export interface NotAvailableProps {
  text: string
}

const NotAvailable: FC<NotAvailableProps> = ({ text }) => {
  return (
    <div className={styles.fallback}>
      <div className={styles['stars']}>
        <div className={styles['central-body']}>
          <span className={styles.text}>{text}</span>
          <div className={styles['objects']}>
            <img
              className={styles['object-rocket']}
              src="images/rocket.svg"
              width="40px"
            />
            <div className={styles['earth-moon']}>
              <img
                className={styles['object-earth']}
                src="images/earth.svg"
                width="100px"
              />
              <img
                className={styles['object-moon']}
                src="images/moon.svg"
                width="80px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotAvailable
