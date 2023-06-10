import { FC, useState } from 'react'

import Button from 'components/Button'

import styles from './WellcomePage.module.css'

interface WellcomePageProps {
  title?: string
  content?: string
}

const WellcomePage: FC<WellcomePageProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false)

  const buttonHandler = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.root}>
      {title && <p data-testid="title">{title}</p>}

      {content && <span>Wellcome Page Content</span>}

      {open && <span>Wellcome Page Second Content</span>}

      <Button
        primary
        size={'small'}
        label={open ? 'Close second content' : 'Open second content'}
        onClick={buttonHandler}
      />
    </div>
  )
}

export default WellcomePage
