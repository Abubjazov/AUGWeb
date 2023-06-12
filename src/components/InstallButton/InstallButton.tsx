import { FC } from 'react'

import SvgIcon from 'components/SvgIcon'

import styles from './InstallButton.module.css'

export enum ButtonMode {
  INSTALL = 'install',
  INSTALLED = 'installed',
  UNINSTALL = 'uninstall',
  UNEXPECTED = 'unexpected',
}

export interface InstallButtonProps {
  loading?: boolean
  disabled?: boolean
  mobile?: boolean
  mode?: ButtonMode
  onClick?: () => void
}

const InstallButton: FC<InstallButtonProps> = ({
  loading = false,
  disabled = false,
  mobile = false,
  mode = ButtonMode.INSTALL,
  onClick,
}) => {
  return loading ? (
    <div
      className={[
        styles.root,
        `${mobile ? styles['skeleton-mobile'] : styles['skeleton-desktop']}`,
      ].join(' ')}
    ></div>
  ) : (
    <button
      type="button"
      data-testid="install-button"
      disabled={disabled}
      className={[
        styles.root,
        `${mobile ? styles.mobile : styles.desktop}`,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
      ].join(' ')}
      onClick={onClick}
    >
      {mobile ? <SvgIcon icon={mode} /> : mode}
    </button>
  )
}

export default InstallButton
