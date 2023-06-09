import { FC, useState } from 'react'

import Button from 'components/Button'

import styles from './MainPage.module.css'

interface MainPageProps {
  title?: string
  content?: string
}

const MainPage: FC<MainPageProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false)

  const buttonHandler = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.root}>
      {title && <p data-testid="title">{title}</p>}

      {content && <span>Main Page Content</span>}

      {open && <span>Main Page Second Content</span>}

      <Button
        primary
        size={'small'}
        label={open ? 'Close second content' : 'Open second content'}
        onClick={buttonHandler}
      />
    </div>
  )
}

export default MainPage
