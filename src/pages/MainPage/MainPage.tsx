import { FC } from 'react'

import cn from 'classnames'

import styles from './MainPage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  return <div className={cn(styles.root)}>Main Page</div>
}

export default MainPage
