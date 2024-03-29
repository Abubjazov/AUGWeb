import { FC } from 'react'

import { useInput } from 'hooks/useInput/useInput'
import { TValidator } from 'hooks/useValidate/useValidate'
import BaseButton from 'uikit/BaseButton'
import { EBaseButtonMode } from 'uikit/BaseButton/BaseButton'
import BaseInput from 'uikit/BaseInput'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './CreateInput.module.css'

export interface CreateInputProps {
  userStyles?: string
  title: string
  placeholder: string
  menuOpened: boolean
  loading?: boolean
  inputValidators?: TValidator
  onClick?: (inputText: string) => void
}

const CreateInput: FC<CreateInputProps> = ({
  userStyles = '',
  inputValidators,
  menuOpened,
  loading,
  placeholder,
  title,
  onClick,
}) => {
  const value = useInput('', { ...inputValidators })

  const submitHandler = () => {
    value.onBlur()

    if (!value.errors.length && onClick) {
      onClick(value.value as string)

      value.onChange({ target: { value: '' } })
      value.setIsDirty(false)
    }
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
        <BaseInput
          dataTestId={'create-name-input'}
          type={'text'}
          name={'tag-name-input'}
          placeholder={placeholder}
          value={value.value}
          onChange={value.onChange}
          onBlur={value.onBlur}
          errors={value.errors}
          isDirty={value.isDirty}
        />

        <BaseButton
          userStyles={styles.button}
          label={'Create'}
          mode={EBaseButtonMode.CONTAINED_BLUE}
          onClick={submitHandler}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default CreateInput
