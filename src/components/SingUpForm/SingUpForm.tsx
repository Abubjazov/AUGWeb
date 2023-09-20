import { FC } from 'react'

import { useInput } from 'hooks/useInput/useInput'
import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import BaseInput from 'uikit/BaseInput'

import styles from './SingUpForm.module.css'

export interface SingUpFormProps {
  userFunction: () => void
}

const SingUpForm: FC<SingUpFormProps> = ({ userFunction }) => {
  const email = useInput('', {
    isEmpty: { value: true, message: 'Email address required' },
    isEmail: { value: true, message: 'Please enter a correct email' },
  })

  const password = useInput('', {
    isEmpty: { value: true, message: 'Password required' },
    minLength: { value: 8, message: 'Minimum password length 8 symbols' },
  })

  const confirmPassword = useInput('', {
    isEmpty: {
      value: true,
      message: 'Please confirm your password',
    },
    isValueMatched: {
      value: true,
      comparisonValue: password.value,
      message: 'Password mismatch',
    },
  })

  return (
    <div className={styles.root}>
      <span className={styles.title}>
        Sign <span className={styles['red-text']}>up</span>
      </span>

      <BaseInput
        dataTestId={'email-input'}
        type={'email'}
        name={'email'}
        placeholder={'email@example.com'}
        value={email.value}
        onChange={email.onChange}
        onBlur={email.onBlur}
        errors={email.errors}
        errorWhite
        isDirty={email.isDirty}
      />

      <BaseInput
        dataTestId={'password-input'}
        type={'password'}
        name={'password'}
        placeholder={'password'}
        value={password.value}
        onChange={password.onChange}
        onBlur={password.onBlur}
        errors={password.errors}
        errorWhite
        isDirty={password.isDirty}
      />

      <BaseInput
        dataTestId={'confirm-password-input'}
        type={'password'}
        name={'confirm-password'}
        placeholder={'password confirm'}
        value={confirmPassword.value}
        onChange={confirmPassword.onChange}
        onBlur={confirmPassword.onBlur}
        errors={confirmPassword.errors}
        errorWhite
        isDirty={confirmPassword.isDirty}
      />

      <div className={styles.buttons}>
        <BaseButton label={'Sign up'} mode={BaseButtonMode.CONTAINED_RED} />

        <BaseButton label={'Cancel'} onClick={userFunction} />
      </div>
    </div>
  )
}

export default SingUpForm
