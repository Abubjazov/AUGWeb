import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import styles from './Page404.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Page404Props {}

const Page404: FC<Page404Props> = () => {
  return (
    <main className={styles.root}>
      <div className={styles['stars']}>
        <div className={styles['central-body']}>
          <img
            className={styles['image-404']}
            src="/images/404.svg"
            width="300px"
          />

          <NavLink className={styles['btn-go-home']} to="/">
            GO BACK HOME
          </NavLink>
        </div>

        <div className={styles['objects']}>
          <img
            className={styles['object-rocket']}
            src="/images/rocket.svg"
            width="40px"
          />
          <div className={styles['earth-moon']}>
            <img
              className={styles['object-earth']}
              src="/images/earth.svg"
              width="100px"
            />
            <img
              className={styles['object-moon']}
              src="/images/moon.svg"
              width="80px"
            />
          </div>
          <div className={styles['box-astronaut']}>
            <img
              className={styles['object-astronaut']}
              src="/images/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className={styles['glowing-stars']}>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
        </div>
      </div>
    </main>
  )
}

export default Page404
