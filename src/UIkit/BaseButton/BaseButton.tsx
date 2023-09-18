import { FC } from 'react'

import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './BaseButton.module.css'

export enum BaseButtonMode {
  OUTLINED_WHITE = 'outlined-white',
  CONTAINED_BLUE = 'contained-blue',
  CONTAINED_RED = 'contained-red',
}

export interface BaseButtonProps {
  loading?: boolean
  disabled?: boolean
  mode?: BaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  loading = false,
  disabled = false,
  mode = BaseButtonMode.OUTLINED_WHITE,
  label,
  onClick,
}) => {
  return loading ? (
    <div className={cc([styles.root, styles.skeleton])}></div>
  ) : (
    <button
      type="button"
      data-testid="base-button"
      disabled={disabled}
      className={cc([
        styles.root,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
      ])}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BaseButton
