import { FC, useState } from 'react'

import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import InstallButton from 'uikit/InstallButton'
import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'

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

      <BaseButton
        mode={BaseButtonMode.OUTLINED}
        label={open ? 'Close second content' : 'Open second content'}
        onClick={buttonHandler}
      />

      <InstallButton mobile mode={InstallButtonMode.INSTALL} />
    </div>
  )
}

export default MainPage
