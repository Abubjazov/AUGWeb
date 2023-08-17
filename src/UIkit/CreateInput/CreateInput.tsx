import { FC } from 'react'

import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './CreateInput.module.css'

interface CreateInputProps {
  userStyles?: string
  title: string
  placeholder: string
  menuOpened: boolean
}

const CreateInput: FC<CreateInputProps> = ({
  userStyles = '',
  menuOpened,
  placeholder,
  title,
}) => {
  return (
    <div
      className={cc([
        styles.root,
        menuOpened ? '' : styles['menu-closed'],
        userStyles,
      ])}
    >
      <span className={styles.title}>{title}</span>

      <div className={styles['input-wrapper']}>
        <input
          type="text"
          name="input"
          maxLength={15}
          placeholder={placeholder}
        />

        <BaseButton label={'Create'} mode={BaseButtonMode.CONTAINED_BLUE} />
      </div>
    </div>
  )
}

export default CreateInput
