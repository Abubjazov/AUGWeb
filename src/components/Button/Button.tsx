import { FC } from 'react'

import styles from './Button.module.css'

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
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
