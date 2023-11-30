import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './MenuButton.module.css'

export enum EMenuButtonMode {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum EMenuButtonIcon {
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
  mode?: EMenuButtonMode
  icon?: EMenuButtonIcon
  onClick: () => void
  disabled?: boolean
}

const MenuButton: FC<MenuButtonProps> = ({
  menuOpened,
  text,
  mode = EMenuButtonMode.INACTIVE,
  icon,
  onClick,
  disabled,
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
      disabled={disabled}
    >
      {icon && <SvgIcon userStyles={styles[`icon-${mode}`]} icon={icon} />}

      <span className={styles[`text-${mode}`]}>{text}</span>
    </button>
  )
}

export default MenuButton
