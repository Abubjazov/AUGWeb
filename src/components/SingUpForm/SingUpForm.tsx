import { FC } from 'react'

import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
// import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SingUpForm.module.css'

export interface SingUpFormProps {
  userFunction: () => void
}

const SingUpForm: FC<SingUpFormProps> = ({ userFunction }) => {
  return (
    <div className={styles.root}>
      <span className={styles.title}>Sign up</span>

      <input
        data-testid="login-input"
        type="email"
        // name="input"
        maxLength={30}
        placeholder={'email@example.com'}
        // value={inputText}
        // onChange={e => onChangeHandler(e)}
      />

      <input
        data-testid="password-input"
        type="password"
        // name="input"
        maxLength={30}
        placeholder={'password'}
        // value={inputText}
        // onChange={e => onChangeHandler(e)}
      />

      <input
        data-testid="password-input"
        type="password"
        // name="input"
        maxLength={30}
        placeholder={'password'}
        // value={inputText}
        // onChange={e => onChangeHandler(e)}
      />

      <div className={styles.buttons}>
        <BaseButton label={'Sign up'} mode={BaseButtonMode.CONTAINED_RED} />

        <BaseButton label={'Cancel'} onClick={userFunction} />
      </div>
    </div>
  )
}

export default SingUpForm
