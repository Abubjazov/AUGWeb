import { FC } from 'react'

import { useInput } from 'hooks/useInput/useInput'
import { useAppSelector } from 'store/hooks'
import { ISignUpData } from 'store/slices/authSlice'
import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import BaseInput from 'uikit/BaseInput'

import styles from './SingInForm.module.css'

export interface SingInFormProps {
  userFunction: () => void
  onSignIn: (data: ISignUpData) => void
}

const SingInForm: FC<SingInFormProps> = ({ userFunction, onSignIn }) => {
  const { status, error } = useAppSelector(state => state.auth)

  const email = useInput('', {
    isEmpty: { value: true, message: 'Email address required' },
    isEmail: { value: true, message: 'Please enter a correct email' },
  })

  const password = useInput('', {
    isEmpty: { value: true, message: 'Password required' },
    minLength: { value: 8, message: 'Minimum password length 8 symbols' },
  })

  const submitHandler = () => {
    email.onBlur()
    password.onBlur()

    if (!email.errors.length && !password.errors.length) {
      onSignIn({ email: String(email.value), password: String(password.value) })
    }
  }

  return (
    <div className={styles.root}>
      <span className={styles.title}>
        Sign <span className={styles['red-text']}>in</span>
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

      <div className={styles.buttons}>
        <BaseButton
          userStyles={styles.button}
          label={'Sign in'}
          mode={BaseButtonMode.CONTAINED_RED}
          onClick={submitHandler}
          loading={status === 'loading'}
        />

        <BaseButton
          userStyles={styles.button}
          label={'Cancel'}
          onClick={userFunction}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'error' && <span>{error}</span>}
    </div>
  )
}

export default SingInForm
