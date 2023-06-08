import { FC, useState } from 'react'

import cn from 'classnames'

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
    <div className={cn(styles.root)}>
      {title && <p data-testid="title">{title}</p>}

      {content && <span>Main Page Content</span>}

      {open && <span>Main Page Second Content</span>}

      <button data-testid="button" onClick={buttonHandler}>
        {open ? 'Close second content' : 'Open second content'}
      </button>
    </div>
  )
}

export default MainPage
