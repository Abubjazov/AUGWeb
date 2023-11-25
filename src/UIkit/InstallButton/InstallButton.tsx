import { FC, useState } from 'react'

import { installDapplet, unInstallDapplet } from 'store/asyncThunks/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Spinner from 'uikit/Spinner/Spinner'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './InstallButton.module.css'

export enum EInstallButtonMode {
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
  setMode?: EInstallButtonMode
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

  const modeSetter = (setMode?: EInstallButtonMode, mobile?: boolean) => {
    if (mobile && !setMode) {
      return targetMyDapplets && targetMyDapplets?.dappletState
        ? EInstallButtonMode.INSTALLED
        : EInstallButtonMode.INSTALL
    }

    if (mobile && setMode) {
      return targetMyDapplets?.dappletState
        ? setMode
        : EInstallButtonMode.DISPLAY_NONE
    }

    return targetMyDapplets && targetMyDapplets?.dappletState
      ? unInstallMode
        ? EInstallButtonMode.UNINSTALL
        : EInstallButtonMode.INSTALLED
      : EInstallButtonMode.INSTALL
  }

  const mode = modeSetter(setMode, mobile)

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (mode === EInstallButtonMode.INSTALL)
      void dispatch(installDapplet(dappletId))

    if (mode === EInstallButtonMode.UNINSTALL)
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
