import { FC } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setModalContent, setModalState } from 'store/slices/layoutSlice'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './StandardModal.module.css'

interface StandardModalProps {
  welcomeMode?: boolean
}

const StandardModal: FC<StandardModalProps> = ({ welcomeMode }) => {
  const { modalContent } = useAppSelector(state => state.layout)
  const dispatch = useAppDispatch()

  const closeModal = () => {
    if (!welcomeMode) {
      dispatch(setModalState(false))
      dispatch(setModalContent(null))
    }
  }

  return (
    <div className={styles['root-wrapper']} onClick={closeModal}>
      <div
        className={cc([styles.root, welcomeMode ? styles['root-welcome'] : ''])}
        onClick={e => e.stopPropagation()}
      >
        <span
          className={cc([
            styles['logo-text'],
            welcomeMode ? styles['logo-text-welcome'] : '',
          ])}
        >
          Dapplets<span className={styles['red-dot']}>.</span>
        </span>

        {modalContent}
      </div>
    </div>
  )
}

export default StandardModal
