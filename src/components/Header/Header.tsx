import { FC } from 'react'

import ExtensionState from 'uikit/ExtensionState'
import HeaderSettings from 'uikit/HeaderSettings'
import SvgIcon from 'uikit/SvgIcon'

import styles from './Header.module.css'

interface HeaderProps {
  windowInnerWidth: number
  menuOpened: boolean
  openCloseMenu: React.Dispatch<React.SetStateAction<boolean>>
  dappletSettingsOpened: boolean
  openCloseSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({
  windowInnerWidth,
  menuOpened,
  openCloseMenu,
  dappletSettingsOpened,
  openCloseSettings,
}) => {
  const burgerClickHandler = () => {
    openCloseMenu(!menuOpened)

    if (windowInnerWidth <= 880) openCloseSettings(false)
  }

  const settingsClickHandler = () => {
    openCloseSettings(!dappletSettingsOpened)

    if (windowInnerWidth <= 880) openCloseMenu(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles['wrapper']}>
        {windowInnerWidth <= 1300 && (
          <div className={styles['burger']} onClick={burgerClickHandler}>
            <SvgIcon icon={'burger'} />
          </div>
        )}

        {windowInnerWidth <= 880 && (
          <span className={styles['logo-text']}>
            Dapplets Project<span className={styles['red-dot']}>.</span>
          </span>
        )}

        {windowInnerWidth > 880 && <ExtensionState />}
      </div>

      <div onClick={settingsClickHandler}>
        <HeaderSettings />
      </div>
    </div>
  )
}

export default Header
