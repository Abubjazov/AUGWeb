import { FC } from 'react'

import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './BaseInput.module.css'

export interface BaseInputProps {
  dataTestId: string
  type: string
  name: string
  placeholder: string
  value: string | number | undefined
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined
  errors: string[]
  errorWhite?: boolean
  isDirty: boolean
}

const BaseInput: FC<BaseInputProps> = ({
  dataTestId,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  errorWhite,
  isDirty,
}) => {
  return (
    <div className={styles.root}>
      <input
        data-testid={dataTestId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {isDirty && errors && (
        <span
          className={cc([
            styles['error-message'],
            errorWhite ? styles['error-message-white'] : '',
          ])}
        >
          {errors[errors.length - 1]}
        </span>
      )}
    </div>
  )
}

export default BaseInput
