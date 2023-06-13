import { FC } from 'react'

import styles from './XComponent.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface XComponentProps {}

const XComponent: FC<XComponentProps> = () => {
  return <div className={styles.root}></div>
}

export default XComponent
