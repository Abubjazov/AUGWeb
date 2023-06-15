import { FC } from 'react'

import styles from './MenuButton.module.css'

export enum MenuButtonIcon {
  ALL_DAPPLETS = 'alldapplets',
  ESSENTIAL_DAPPLETS = 'essentialdapplets',
  FINANCIAL_DAPPLETS = 'financialdapplets',
  EDITOR_CHOICE = 'editorchoice',
  SOCIAL_NETWORKS = 'socialnetworks',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuButtonProps {}

const MenuButton: FC<MenuButtonProps> = () => {
  return <div className={styles.root}></div>
}

export default MenuButton
