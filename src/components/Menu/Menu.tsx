import { FC } from 'react'

import TagsGroup from 'components/TagsGroup'
import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { logOut } from 'store/asyncThunks/authentication'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setMenuButtonsState, setMenuState } from 'store/slices/layoutSlice'
import MenuButton from 'uikit/MenuButton'
import { EMenuButtonIcon, EMenuButtonMode } from 'uikit/MenuButton/MenuButton'
import MyLists from 'uikit/MyLists'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './Menu.module.css'

export interface MenuProps {
  windowInner?: boolean
}

const menuButtonsList = [
  { text: 'All Dapplets', icon: EMenuButtonIcon.ALL_DAPPLETS },
  { text: 'Editor’s Choice', icon: EMenuButtonIcon.EDITOR_CHOICE },
  { text: 'Essential Dapplets', icon: EMenuButtonIcon.ESSENTIAL_DAPPLETS },
  { text: 'Financial Dapplets', icon: EMenuButtonIcon.FINANCIAL_DAPPLETS },
  { text: 'Social Networks', icon: EMenuButtonIcon.SOCIAL_NETWORKS },
]

const Menu: FC<MenuProps> = ({ windowInner }) => {
  const navigate = useNavigate()
  const windowInnerWidth = useResize()

  const { menuOpened, menuButtonsState } = useAppSelector(state => state.layout)
  const { isLoadingDapplets } = useAppSelector(state => state.dapplets)
  const { userTags, tagOperationGoing } = useAppSelector(
    state => state.userData,
  )

  const dispatch = useAppDispatch()

  const menuButtonClickHandler = (state: number) => {
    state !== 4 && dispatch(setMenuButtonsState(state))
    state === 4 && navigate('/social')

    windowInnerWidth <= 1300 && dispatch(setMenuState(false))
  }

  const arrowButtonClickHandler = () => {
    dispatch(setMenuState(!menuOpened))
  }

  const onSignOut = () => {
    windowInnerWidth <= 1300 && dispatch(setMenuState(false))
    void dispatch(logOut())
  }

  return (
    <div className={styles['root']}>
      <div>
        <div
          className={cc([
            styles['menu-header'],
            menuOpened ? '' : styles['menu-closed'],
          ])}
        >
          {windowInnerWidth > 880 && (
            <div className={styles['logo-wrapper']}>
              <div
                onClick={arrowButtonClickHandler}
                className={styles['menu-logo']}
                data-testid={'menu-logo-button'}
              >
                <SvgIcon icon={'logo'} />
              </div>

              <span className={styles['logo-text']}>
                Dapplets Project<span className={styles['red-dot']}>.</span>
              </span>
            </div>
          )}

          {!windowInner && (
            <div
              className={styles['arrow-button']}
              onClick={arrowButtonClickHandler}
              data-testid={'menu-arrow-button'}
            >
              <SvgIcon icon={'arrowRight'} />
            </div>
          )}
        </div>

        <nav className={styles['menu-buttons']}>
          {menuButtonsList.map((button, index) => {
            return (
              <MenuButton
                key={nanoid()}
                menuOpened={menuOpened}
                text={button.text}
                icon={button.icon}
                mode={
                  menuButtonsState === index
                    ? EMenuButtonMode.ACTIVE
                    : EMenuButtonMode.INACTIVE
                }
                onClick={() => menuButtonClickHandler(index)}
                disabled={isLoadingDapplets}
              />
            )
          })}
        </nav>

        {windowInnerWidth > 1300 && (
          <>
            <MyLists
              userStyles={styles['margin-top-40']}
              menuOpened={menuOpened}
            />

            <TagsGroup
              userStyles={styles['margin-top-40']}
              menuOpened={menuOpened}
              tags={userTags}
              title={'My tags'}
              tagMode={ESmartTagMode.MY_TAG}
              tagOperationGoing={tagOperationGoing}
            />
          </>
        )}
      </div>

      <div className={styles['logout-button']}>
        <MenuButton
          key={nanoid()}
          menuOpened={menuOpened}
          text={'SignOut'}
          icon={EMenuButtonIcon.SIGN_OUT}
          mode={EMenuButtonMode.INACTIVE}
          onClick={onSignOut}
        />
      </div>
    </div>
  )
}

export default Menu
