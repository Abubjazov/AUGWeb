import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'

import styles from './HeaderSettings.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderSettingsProps {}

const HeaderSettings: FC<HeaderSettingsProps> = () => {
  return (
    <div className={styles.root}>
      <SvgIcon icon={'settings'} />

      <span className={styles.text}>Settings</span>
    </div>
  )
}

export default HeaderSettings
