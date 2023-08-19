import { FC } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setMenuState, setDappletSettingsState } from 'store/slices/layoutSlice'
import ExtensionState from 'uikit/ExtensionState'
import HeaderSettings from 'uikit/HeaderSettings'
import SvgIcon from 'uikit/SvgIcon'

import styles from './Header.module.css'

interface HeaderProps {
  windowInnerWidth: number
}

const Header: FC<HeaderProps> = ({ windowInnerWidth }) => {
  const { menuOpened, dappletSettingsOpened } = useAppSelector(
    state => state.layout,
  )

  const dispatch = useAppDispatch()

  const burgerClickHandler = () => {
    dispatch(setMenuState(!menuOpened))

    if (windowInnerWidth <= 880) dispatch(setDappletSettingsState(false))
  }

  const settingsClickHandler = () => {
    dispatch(setDappletSettingsState(!dappletSettingsOpened))

    if (windowInnerWidth <= 880) dispatch(setMenuState(false))
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
