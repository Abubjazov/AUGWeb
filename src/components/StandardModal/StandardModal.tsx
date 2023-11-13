import { FC, ReactNode } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setModalState } from 'store/slices/layoutSlice'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './StandardModal.module.css'

interface StandardModalProps {
  welcomeMode?: boolean
  modalContent?: ReactNode
}

const StandardModal: FC<StandardModalProps> = ({
  welcomeMode,
  modalContent,
}) => {
  const dispatch = useAppDispatch()

  const { modalInner } = useAppSelector(state => state.layout)

  const closeModal = () => {
    if (!welcomeMode) {
      dispatch(setModalState(false))
    }
  }

  return (
    <div
      data-testid="close-modal-div"
      className={styles['root-wrapper']}
      onClick={closeModal}
    >
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

        {modalContent ? modalContent : modalInner}
      </div>
    </div>
  )
}

export default StandardModal
