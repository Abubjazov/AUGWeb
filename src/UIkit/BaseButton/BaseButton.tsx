import { FC } from 'react'

import { SmallSpinner } from 'uikit/Spinner/SmallSpinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './BaseButton.module.css'

export enum BaseButtonMode {
  OUTLINED_WHITE = 'outlined-white',
  CONTAINED_BLUE = 'contained-blue',
  CONTAINED_RED = 'contained-red',
}

export interface BaseButtonProps {
  userStyles?: string
  // widthPx?: number
  loading?: boolean
  disabled?: boolean
  mode?: BaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  // widthPx,
  userStyles = '',
  loading = false,
  disabled = false,
  mode = BaseButtonMode.OUTLINED_WHITE,
  label,
  onClick,
}) => {
  return (
    <button
      // style={widthPx ? { width: `${widthPx}px` } : {}}
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
      {loading ? <SmallSpinner /> : label}
    </button>
  )
}

export default BaseButton
