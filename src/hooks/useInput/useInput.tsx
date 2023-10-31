import { useEffect, useState } from 'react'

import { TValidator, useValidate } from 'hooks/useValidate/useValidate'

export type TInputValue = string | number | readonly string[] | undefined

export const useInput = (
  initialValue: TInputValue,

  validators: TValidator,
) => {
  const [value, setValue] = useState(initialValue)
  const [errors, setErrors] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState(false)

  const valid = useValidate(value, validators, isDirty)

  useEffect(() => {
    if (validators.isValueMatched && valid.isValueMatched.isValueMatched) {
      setErrors(prev => [...prev, valid.isValueMatched.message])
    } else {
      setErrors(prev => [
        ...prev.filter(error => error !== valid.isValueMatched.message),
      ])
    }

    if (validators.isEmail && valid.isEmail.isEmail) {
      setErrors(prev => [...prev, valid.isEmail.message])
    } else {
      setErrors(prev => [
        ...prev.filter(error => error !== valid.isEmail.message),
      ])
    }

    if (validators.isEmpty && valid.isEmpty.isEmpty) {
      setErrors(prev => [...prev, valid.isEmpty.message])
    } else {
      setErrors(prev => [
        ...prev.filter(error => error !== valid.isEmpty.message),
      ])
    }

    if (validators.minLength && valid.minLengthError.minLengthError) {
      setErrors(prev => [...prev, valid.minLengthError.message])
    } else {
      setErrors(prev => [
        ...prev.filter(error => error !== valid.minLengthError.message),
      ])
    }

    if (validators.maxLength && valid.maxLengthError.maxLengthError) {
      setErrors(prev => [...prev, valid.maxLengthError.message])
    } else {
      setErrors(prev => [
        ...prev.filter(error => error !== valid.maxLengthError.message),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    valid.isEmpty.isEmpty,
    valid.minLengthError.minLengthError,
    valid.maxLengthError.maxLengthError,
    valid.isEmail.isEmail,
    valid.isValueMatched.isValueMatched,
  ])

  const onChange = (e: { target: { value: TInputValue } }) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsDirty(true)
  }

  return { value, onChange, onBlur, isDirty, setIsDirty, errors, ...valid }
}
