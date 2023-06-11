import { FC } from 'react'

import styles from './WellcomePage.module.css'

interface WellcomePageProps {
  title?: string
  content?: string
}

const WellcomePage: FC<WellcomePageProps> = ({ title, content }) => {
  return (
    <div className={styles.root}>
      {title && <p data-testid="title">{title}</p>}

      {content && <span>Wellcome Page Content</span>}
    </div>
  )
}

export default WellcomePage
