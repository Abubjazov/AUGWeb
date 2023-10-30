import { FC } from 'react'

import Spinner from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './BaseButton.module.css'

export enum BaseButtonMode {
  OUTLINED_WHITE = 'outlined-white',
  CONTAINED_BLUE = 'contained-blue',
  CONTAINED_RED = 'contained-red',
}

export interface BaseButtonProps {
  userStyles?: string
  loading?: boolean
  disabled?: boolean
  mode?: BaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  userStyles = '',
  loading = false,
  disabled = false,
  mode = BaseButtonMode.OUTLINED_WHITE,
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
      {loading ? <Spinner width={20} strokeWidth={8} stroke="#fff" /> : label}
    </button>
  )
}

export default BaseButton
