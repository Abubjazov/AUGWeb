import { FC, useState } from 'react'

import TagsGroup from 'components/TagsGroup'
import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { logOut } from 'services/authentication/authentication'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setMenuState } from 'store/slices/layoutSlice'
import MenuButton from 'uikit/MenuButton'
import { MenuButtonIcon, MenuButtonMode } from 'uikit/MenuButton/MenuButton'
import MyLists from 'uikit/MyLists'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './Menu.module.css'

export interface MenuProps {
  windowInner?: boolean
}

const menuButtonsList = [
  { text: 'All Dapplets', icon: MenuButtonIcon.ALL_DAPPLETS },
  { text: 'Editor’s Choice', icon: MenuButtonIcon.EDITOR_CHOICE },
  { text: 'Essential Dapplets', icon: MenuButtonIcon.ESSENTIAL_DAPPLETS },
  { text: 'Social Networks', icon: MenuButtonIcon.SOCIAL_NETWORKS },
  { text: 'Financial Dapplets', icon: MenuButtonIcon.FINANCIAL_DAPPLETS },
]

const Menu: FC<MenuProps> = ({ windowInner }) => {
  const windowInnerWidth = useResize()

  const { menuOpened } = useAppSelector(state => state.layout)
  const { userTags, tagOperationGoing } = useAppSelector(
    state => state.userData,
  )

  const dispatch = useAppDispatch()

  const [menuButtonState, setMenuButtonState] = useState(0)

  const menuButtonClickHandler = (state: number) => {
    setMenuButtonState(state)
  }

  const arrowButtonClickHandler = () => {
    dispatch(setMenuState(!menuOpened))
  }

  const onSignOut = () => {
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
                  menuButtonState === index
                    ? MenuButtonMode.ACTIVE
                    : MenuButtonMode.INACTIVE
                }
                onClick={() => menuButtonClickHandler(index)}
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
              tagMode={SmartTagMode.MY_TAG}
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
          icon={MenuButtonIcon.SIGN_OUT}
          mode={MenuButtonMode.INACTIVE}
          onClick={onSignOut}
        />
      </div>
    </div>
  )
}

export default Menu
