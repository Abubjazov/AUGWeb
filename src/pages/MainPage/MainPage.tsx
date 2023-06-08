import { FC } from 'react'

import cn from 'classnames'

import styles from './MainPage.module.css'

interface MainPageProps {
  title: string
}

const MainPage: FC<MainPageProps> = ({ title }) => {
  return (
    <div className={cn(styles.root)}>
      <p>{title}</p>
    </div>
  )
}

export default MainPage
