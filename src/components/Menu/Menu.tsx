import { FC, useState } from 'react'

import MyTags from 'components/TagsGroup'
import { nanoid } from 'nanoid'
import MenuButton from 'uikit/MenuButton'
import { MenuButtonIcon, MenuButtonMode } from 'uikit/MenuButton/MenuButton'
import MyLists from 'uikit/MyLists'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'utils/hooks/useResize'
import { mockTags } from 'utils/mockData'

import styles from './Menu.module.css'

interface MenuProps {
  windowInner?: boolean
  menuOpened: boolean
  openCloseMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const menuButtonsList = [
  { text: 'All Dapplets', icon: MenuButtonIcon.ALL_DAPPLETS },
  { text: 'Editor’s Choice', icon: MenuButtonIcon.EDITOR_CHOICE },
  { text: 'Essential Dapplets', icon: MenuButtonIcon.ESSENTIAL_DAPPLETS },
  { text: 'Social Networks', icon: MenuButtonIcon.SOCIAL_NETWORKS },
  { text: 'Financial Dapplets', icon: MenuButtonIcon.FINANCIAL_DAPPLETS },
]

const Menu: FC<MenuProps> = ({ windowInner, menuOpened, openCloseMenu }) => {
  const windowInnerWidth = useResize()

  const [menuButtonState, setMenuButtonState] = useState(0)

  const menuButtonClickHandler = (state: number) => {
    setMenuButtonState(state)
  }

  const arrowButtonClickHandler = () => {
    openCloseMenu(!menuOpened)
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
            tags={mockTags}
            title={'My tags'}
            tagMode={SmartTagMode.MY_TAG}
          />
        </>
      )}
    </div>
  )
}

export default Menu
