import { FC } from 'react'

import Spinner from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './BaseButton.module.css'

export enum EBaseButtonMode {
  OUTLINED_WHITE = 'outlined-white',
  CONTAINED_BLUE = 'contained-blue',
  CONTAINED_RED = 'contained-red',
}

export interface BaseButtonProps {
  userStyles?: string
  loading?: boolean
  disabled?: boolean
  mode?: EBaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  userStyles = '',
  loading = false,
  disabled = false,
  mode = EBaseButtonMode.OUTLINED_WHITE,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      data-testid="base-button"
      disabled={disabled}
      className={cc([
        styles.root,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
        userStyles,
      ])}
      onClick={onClick}
    >
      {loading ? (
        <Spinner width={20} height={20} strokeWidth={8} strokeColor="#fff" />
      ) : (
        label
      )}
    </button>
  )
}

export default BaseButton
