import { FC, ReactNode, useEffect } from 'react'

import DappletSettings from 'components/DappletSettings'
import Header from 'components/Header'
import Menu from 'components/Menu'
import StandardModal from 'components/StandardModal'
import { useResize } from 'hooks/useResize/useResize'
import { getCommunityTags } from 'store/asyncThunks/dapplets'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setMenuState, setDappletSettingsState } from 'store/slices/layoutSlice'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './Layout.module.css'

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const windowInnerWidth = useResize()

  const { modalState, menuOpened, dappletSettingsOpened } = useAppSelector(
    state => state.layout,
  )

  const dispatch = useAppDispatch()

  const returnLayoutTemplate = (width: number) => {
    if (width <= 1300)
      return {
        gridTemplateColumns: '1fr',
      }
    if (width <= 1600)
      return {
        gridTemplateColumns: `${menuOpened ? 325 : 100}px 1fr`,
      }
    return {
      gridTemplateColumns: `${menuOpened ? 325 : 100}px 1fr ${
        dappletSettingsOpened ? 325 : 55
      }px`,
    }
  }

  const childrenClickHandler = () => {
    if (windowInnerWidth <= 1300) {
      dispatch(setDappletSettingsState(false))
      dispatch(setMenuState(false))
    }
  }

  useEffect(() => {
    void dispatch(getCommunityTags())
  }, [dispatch])

  return (
    <div className={styles.root} style={returnLayoutTemplate(windowInnerWidth)}>
      {windowInnerWidth > 1300 && (
        <div className={styles.menu}>
          <Menu />
        </div>
      )}

      <div>
        <div className={styles.header}>
          <Header windowInnerWidth={windowInnerWidth} />

          {windowInnerWidth <= 1600 && dappletSettingsOpened && (
            <div
              className={cc([
                styles['dapplet-settings'],
                styles['dapplet-settings-1600'],
              ])}
            >
              <DappletSettings windowInner />
            </div>
          )}

          {windowInnerWidth <= 1300 && menuOpened && (
            <div className={cc([styles['menu'], styles['menu-1300']])}>
              <Menu windowInner />
            </div>
          )}
        </div>

        <div className={styles['children']} onClick={childrenClickHandler}>
          {children}
        </div>
      </div>

      {windowInnerWidth > 1600 && (
        <div className={styles['dapplet-settings']}>
          <DappletSettings />
        </div>
      )}

      <img
        className={styles['main-bg']}
        width={'100%'}
        height={'100%'}
        src="images/mainBg.svg"
        alt="background"
      />

      {modalState && <StandardModal />}
    </div>
  )
}

export default Layout
