import { FC } from 'react'

import styles from './EmptyComponent.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EmptyComponentProps {}

const EmptyComponent: FC<EmptyComponentProps> = () => {
  return <div className={styles.root}></div>
}

export default EmptyComponent
