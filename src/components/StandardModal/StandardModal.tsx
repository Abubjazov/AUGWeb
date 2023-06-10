import { FC } from 'react'

import styles from './WellcomeCard.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StandardModalProps {}

const StandardModal: FC<StandardModalProps> = () => {
  return <div className={styles.root}></div>
}

export default StandardModal
