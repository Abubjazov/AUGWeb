import { FC, useState } from 'react'

import { ERenderMode } from 'components/AddUserTagModalContent/AddUserTagModalContent'
import SingInForm from 'components/SingInForm'
import SingUpForm from 'components/SingUpForm'
import { createUser, logIn } from 'store/asyncThunks/authentication'
import { useAppDispatch } from 'store/hooks'
import { ISignUpData } from 'store/slices/authSlice'
import BaseButton from 'uikit/BaseButton'
import { EBaseButtonMode } from 'uikit/BaseButton/BaseButton'

import styles from './WelcomeModalContent.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WelcomeModalContentProps {}

const WelcomeModalContent: FC<WelcomeModalContentProps> = () => {
  const dispatch = useAppDispatch()

  const [renderMode, setRenderMode] = useState<ERenderMode>(ERenderMode.WELCOME)

  const setRenderModeToWelcome = () => {
    setRenderMode(ERenderMode.WELCOME)
  }

  const onSignUp = (data: ISignUpData) => {
    void dispatch(createUser(data))
  }

  const onSignIn = (data: ISignUpData) => {
    void dispatch(logIn(data))
  }

  const renderWelcome = () => (
    <div className={styles['root']}>
      <span className={styles.title}>Welcome</span>

      <span className={styles.text}>
        We are building an Augmented Web platform consisting of a browser-based
        plugin and decentralized applications (dapplets) based on crypto
        technologies.
      </span>

      <span className={styles.text}>
        Our platform is created on an open-source basis and is available to
        developers from all over the world.
      </span>

      <div className={styles.buttons}>
        <BaseButton
          userStyles={styles.button}
          label={'Sign up'}
          mode={EBaseButtonMode.CONTAINED_RED}
          onClick={() => setRenderMode(ERenderMode.REGISTRATION)}
        />

        <BaseButton
          userStyles={styles.button}
          label={'Sign in'}
          onClick={() => setRenderMode(ERenderMode.LOGIN)}
        />
      </div>
    </div>
  )

  return (
    <>
      {renderMode === ERenderMode.WELCOME && renderWelcome()}

      {renderMode === ERenderMode.LOGIN && (
        <SingInForm userFunction={setRenderModeToWelcome} onSignIn={onSignIn} />
      )}

      {renderMode === ERenderMode.REGISTRATION && (
        <SingUpForm userFunction={setRenderModeToWelcome} onSignUp={onSignUp} />
      )}
    </>
  )
}

export default WelcomeModalContent
