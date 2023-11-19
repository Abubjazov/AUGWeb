import { useEffect, useState } from 'react'

import { TInputValue } from 'hooks/useInput/useInput'

export enum EValidator {
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  IS_EMPTY = 'isEmpty',
  IS_EMAIL = 'isEmail',
  IS_VALUE_MATCHED = 'isValueMatched',
}

export interface IValidator {
  minLength: number
  maxLength: number
  isEmpty: boolean
  isEmail: boolean
  isValueMatched: boolean
}

export type TValidator = {
  [key in EValidator]?: {
    value: IValidator[key]
    comparisonValue?: TInputValue
    message: string
  }
}

export const useValidate = (
  value: TInputValue,
  validators: TValidator,
  isDirty: boolean,
) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const [isValueMatched, setIsValueMatched] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case EValidator.MIN_LENGTH:
          value &&
          validators?.minLength &&
          value?.toString().length < validators.minLength.value
            ? setMinLengthError(true)
            : setMinLengthError(false)
          break

        case EValidator.MAX_LENGTH:
          value &&
          validators?.maxLength &&
          value?.toString().length > validators.maxLength.value
            ? setMaxLengthError(true)
            : setMaxLengthError(false)
          break

        case EValidator.IS_EMPTY:
          value ? setIsEmpty(false) : setIsEmpty(true)
          break

        case EValidator.IS_EMAIL:
          // eslint-disable-next-line no-case-declarations
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          value && re.test(value?.toString()?.toLowerCase())
            ? setIsEmail(false)
            : setIsEmail(true)
          break

        case EValidator.IS_VALUE_MATCHED:
          value && value === validators.isValueMatched?.comparisonValue
            ? setIsValueMatched(false)
            : setIsValueMatched(true)
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isDirty, validators.isValueMatched?.comparisonValue])

  return {
    isEmpty: { isEmpty, message: validators.isEmpty?.message || 'isEmpty' },
    isEmail: { isEmail, message: validators.isEmail?.message || 'isEmail' },
    isValueMatched: {
      isValueMatched,
      message: validators.isValueMatched?.message || 'isValueMatched',
    },
    minLengthError: {
      minLengthError,
      message: validators.minLength?.message || 'minLengthError',
    },
    maxLengthError: {
      maxLengthError,
      message: validators.maxLength?.message || 'maxLengthError',
    },
  }
}
