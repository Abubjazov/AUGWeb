import { FC, useState } from 'react'

import { installDapplet, unInstallDapplet } from 'store/asyncThunks/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Spinner from 'uikit/Spinner/Spinner'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './InstallButton.module.css'

export enum InstallButtonMode {
  INSTALL = 'install',
  INSTALLED = 'installed',
  UNINSTALL = 'uninstall',
  DISPLAY_NONE = 'display-none',
}

export interface InstallButtonProps {
  dappletId: string
  loading?: boolean
  disabled?: boolean
  mobile?: boolean
  setMode?: InstallButtonMode
}

const InstallButton: FC<InstallButtonProps> = ({
  dappletId,
  loading = false,
  disabled = false,
  mobile = false,
  setMode,
}) => {
  const dispatch = useAppDispatch()

  const myDapplets = useAppSelector(state => state.userData.userDapplets)

  const [unInstallMode, setUnInstallMode] = useState(false)

  const targetMyDapplets = myDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  const modeSetter = (setMode?: InstallButtonMode, mobile?: boolean) => {
    if (mobile && !setMode) {
      return targetMyDapplets && targetMyDapplets?.dappletState
        ? InstallButtonMode.INSTALLED
        : InstallButtonMode.INSTALL
    }

    if (mobile && setMode) {
      return targetMyDapplets?.dappletState
        ? setMode
        : InstallButtonMode.DISPLAY_NONE
    }

    return targetMyDapplets && targetMyDapplets?.dappletState
      ? unInstallMode
        ? InstallButtonMode.UNINSTALL
        : InstallButtonMode.INSTALLED
      : InstallButtonMode.INSTALL
  }

  const mode = modeSetter(setMode, mobile)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (mode === InstallButtonMode.INSTALL)
      void dispatch(installDapplet(dappletId))

    if (mode === InstallButtonMode.UNINSTALL)
      void dispatch(unInstallDapplet(dappletId))
  }

  return (
    <button
      type="button"
      aria-label={`Install dapplet ${dappletId}`}
      data-testid="install-button"
      disabled={disabled}
      className={cc([
        styles.root,
        `${mobile ? styles.mobile : styles.desktop}`,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
      ])}
      onClick={onClick}
      onMouseEnter={() => setUnInstallMode(true)}
      onMouseLeave={() => setUnInstallMode(false)}
    >
      {loading ? (
        <Spinner width={20} height={20} strokeWidth={8} stroke="#fff" />
      ) : mobile ? (
        <SvgIcon icon={mode} />
      ) : (
        mode
      )}
    </button>
  )
}

export default InstallButton
