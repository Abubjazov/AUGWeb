import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'

import styles from './ExtensionState.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExtensionStateProps {}

const ExtensionState: FC<ExtensionStateProps> = () => {
  return (
    <div className={styles.root}>
      <SvgIcon icon={'cloudNetwork'} />

      <span className={styles.text}>
        Extension state: <span className={styles.state}>Active</span>
      </span>
    </div>
  )
}

export default ExtensionState
