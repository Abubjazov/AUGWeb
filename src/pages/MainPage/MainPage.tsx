import { FC } from 'react'

import DappletsGroup from 'components/DappletsGroup'
import SearchGroup from 'components/SearchGroup'
import { mockDapplets } from 'utils/mockData'

import styles from './MainPage.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles['root-wrapper']}>
        <SearchGroup />

        <div className={styles.divider}></div>

        <DappletsGroup dapplets={mockDapplets} />
      </div>
    </div>
  )
}

export default MainPage
