import { FC } from 'react'

import { useAppSelector } from 'store/hooks'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './InstallButton.module.css'

export enum InstallButtonMode {
  INSTALL = 'install',
  INSTALLED = 'installed',
  UNINSTALL = 'uninstall',
}

export interface InstallButtonProps {
  dappletId: number
  loading?: boolean
  disabled?: boolean
  mobile?: boolean
  mode?: InstallButtonMode
  onClick?: () => void
}

const InstallButton: FC<InstallButtonProps> = ({
  dappletId,
  loading = false,
  disabled = false,
  mobile = false,
  mode = InstallButtonMode.INSTALL,
  onClick,
}) => {
  const myDapplets = useAppSelector(state => state.myDapplets.myDapplets)

  const targetMyDapplets = myDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  mode =
    targetMyDapplets && targetMyDapplets.dappletState
      ? InstallButtonMode.INSTALLED
      : InstallButtonMode.INSTALL

  return loading ? (
    <div
      className={cc([
        styles.root,
        `${mobile ? styles['skeleton-mobile'] : styles['skeleton-desktop']}`,
      ])}
    ></div>
  ) : (
    <button
      type="button"
      data-testid="install-button"
      disabled={disabled}
      className={cc([
        styles.root,
        `${mobile ? styles.mobile : styles.desktop}`,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
      ])}
      onClick={onClick}
    >
      {mobile ? <SvgIcon icon={mode} /> : mode}
    </button>
  )
}

export default InstallButton
