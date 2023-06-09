import { FC } from 'react'

import styles from './Button.module.css'

export interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}) => {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      data-testid="button"
      type="button"
      className={[styles.root, styles[size], mode].join(' ')}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
