import { FC, ReactNode, useState } from 'react'

import DappletSettings from 'components/DappletSettings'
import Header from 'components/Header'
import Menu from 'components/Menu'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'utils/hooks/useResize'

import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const windowInnerWidth = useResize()

  const [menuOpened, setMenuOpened] = useState(
    windowInnerWidth > 1300 ? true : false,
  )
  const [dappletSettingsOpened, setDappletSettingsOpened] = useState(
    windowInnerWidth > 1600 ? true : false,
  )

  const returnLayoutTemplate = (width: number) => {
    if (width <= 1300)
      return {
        gridTemplateColumns: '1fr',
      }
    if (width <= 1600)
      return {
        gridTemplateColumns: `${menuOpened ? 360 : 100}px 1fr`,
      }
    return {
      gridTemplateColumns: `${menuOpened ? 360 : 100}px 1fr ${
        dappletSettingsOpened ? 320 : 55
      }px`,
    }
  }

  const childrenClickHandler = () => {
    if (windowInnerWidth <= 880) {
      setDappletSettingsOpened(false)
      setMenuOpened(false)
    }
  }

  return (
    <div className={styles.root} style={returnLayoutTemplate(windowInnerWidth)}>
      {windowInnerWidth > 1300 && (
        <div className={styles.menu}>
          <Menu menuOpened={menuOpened} openCloseMenu={setMenuOpened} />
        </div>
      )}

      <div>
        <div className={styles.header}>
          <Header
            windowInnerWidth={windowInnerWidth}
            openCloseMenu={setMenuOpened}
            openCloseSettings={setDappletSettingsOpened}
            menuOpened={menuOpened}
            dappletSettingsOpened={dappletSettingsOpened}
          />

          {windowInnerWidth <= 1600 && dappletSettingsOpened && (
            <div className={cc([styles['dapplet-settings-1600']])}>
              <DappletSettings
                opened={dappletSettingsOpened}
                openClose={setDappletSettingsOpened}
                windowInner
              />
            </div>
          )}

          {windowInnerWidth <= 1300 && menuOpened && (
            <div className={cc([styles['menu'], styles['menu-1300']])}>
              <Menu
                menuOpened={menuOpened}
                openCloseMenu={setMenuOpened}
                windowInner
              />
            </div>
          )}
        </div>

        <div onClick={childrenClickHandler}>{children}</div>
      </div>

      {windowInnerWidth > 1600 && (
        <div className={styles['dapplet-settings']}>
          <DappletSettings
            opened={dappletSettingsOpened}
            openClose={setDappletSettingsOpened}
          />
        </div>
      )}

      <img
        className={styles['main-bg']}
        src="/public/mainBg.svg"
        alt="background"
      />
    </div>
  )
}

export default Layout
