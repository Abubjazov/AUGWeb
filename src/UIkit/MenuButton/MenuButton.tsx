import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './MenuButton.module.css'

export enum MenuButtonMode {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum MenuButtonIcon {
  ALL_DAPPLETS = 'alldapplets',
  ESSENTIAL_DAPPLETS = 'essentialdapplets',
  FINANCIAL_DAPPLETS = 'financialdapplets',
  EDITOR_CHOICE = 'editorchoice',
  SOCIAL_NETWORKS = 'socialnetworks',
  SIGN_OUT = 'signout',
}

export interface MenuButtonProps {
  menuOpened: boolean
  text: string
  mode?: MenuButtonMode
  icon?: MenuButtonIcon
  onClick?: () => void
}

const MenuButton: FC<MenuButtonProps> = ({
  menuOpened,
  text,
  mode = MenuButtonMode.INACTIVE,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      data-testid="menu-button"
      className={cc([
        styles.root,
        styles[`root-${mode}`],
        menuOpened ? '' : styles['menu-closed'],
      ])}
      onClick={onClick}
    >
      {icon && <SvgIcon userStyles={styles[`icon-${mode}`]} icon={icon} />}

      <span className={styles[`text-${mode}`]}>{text}</span>
    </button>
  )
}

export default MenuButton
