import { FC, useState } from 'react'

import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './CreateInput.module.css'

export interface CreateInputProps {
  userStyles?: string
  title: string
  placeholder: string
  menuOpened: boolean
  loading?: boolean
  onClick?: (inputText: string) => void
}

const CreateInput: FC<CreateInputProps> = ({
  userStyles = '',
  menuOpened,
  loading,
  placeholder,
  title,
  onClick,
}) => {
  const [inputText, setInputText] = useState('')

  const onChangeHandler = (event: { target: { value: string } }) => {
    setInputText(String(event.target.value))
  }

  const onClickHandler = () => {
    if (onClick) onClick(inputText)

    setInputText('')
  }

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
          data-testid="create-input"
          type="text"
          name="input"
          maxLength={15}
          placeholder={placeholder}
          value={inputText}
          onChange={onChangeHandler}
        />

        <BaseButton
          userStyles={styles.button}
          label={'Create'}
          mode={BaseButtonMode.CONTAINED_BLUE}
          onClick={onClickHandler}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default CreateInput
