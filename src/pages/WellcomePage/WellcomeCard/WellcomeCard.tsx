import { FC } from 'react'

import styles from './WellcomeCard.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WellcomeCardProps {}

const WellcomeCard: FC<WellcomeCardProps> = () => {
  return <div className={styles.root}></div>
}

export default WellcomeCard
