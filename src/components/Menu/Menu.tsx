import { FC, useState } from 'react'

import MyTags from 'components/TagsGroup'
import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setMenuState } from 'store/slices/layoutSlice'
import MenuButton from 'uikit/MenuButton'
import { MenuButtonIcon, MenuButtonMode } from 'uikit/MenuButton/MenuButton'
import MyLists from 'uikit/MyLists'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'hooks/useResize'

import styles from './Menu.module.css'

interface MenuProps {
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
  const myTags = useAppSelector(state => state.myDapplets.myTags)

  const dispatch = useAppDispatch()

  const [menuButtonState, setMenuButtonState] = useState(0)

  const menuButtonClickHandler = (state: number) => {
    setMenuButtonState(state)
  }

  const arrowButtonClickHandler = () => {
    dispatch(setMenuState(!menuOpened))
  }

  return (
    <div className={styles['root']}>
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
          <MyLists menuOpened={menuOpened} />

          <MyTags
            menuOpened={menuOpened}
            tags={myTags}
            title={'My tags'}
            tagMode={SmartTagMode.MY_TAG}
          />
        </>
      )}
    </div>
  )
}

export default Menu
