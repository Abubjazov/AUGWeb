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
  widthPx?: number
  loading?: boolean
  disabled?: boolean
  mode?: BaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  widthPx,
  loading = false,
  disabled = false,
  mode = BaseButtonMode.OUTLINED_WHITE,
  label,
  onClick,
}) => {
  return (
    <div style={widthPx ? { width: `${widthPx}px` } : {}}>
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
        {loading ? <SmallSpinner /> : label}
      </button>
    </div>
  )
}

export default BaseButton
