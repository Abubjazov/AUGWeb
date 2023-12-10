import { FC, useEffect, useState } from 'react'

import { useAppSelector } from 'store/hooks'
import SvgIcon from 'uikit/SvgIcon'

import styles from './ExtensionState.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExtensionStateProps {}

const ExtensionState: FC<ExtensionStateProps> = () => {
  const [isConnection, setIsConnection] = useState(false)

  const { isInProgress } = useAppSelector(state => state.auth)

  const { isLoadingDapplets, isLoadingMoreDapplets } = useAppSelector(
    state => state.dapplets,
  )

  const {
    isAddingUserTag,
    isAddingUserList,
    isLoadingUserData,
    tagOperationGoing,
    dappletOperationGoing,
    listOperationGoing,
  } = useAppSelector(state => state.userData)

  useEffect(() => {
    if (
      isLoadingDapplets ||
      isLoadingMoreDapplets ||
      isAddingUserTag ||
      isAddingUserList ||
      isLoadingUserData ||
      tagOperationGoing.length ||
      dappletOperationGoing.length ||
      listOperationGoing.length ||
      isInProgress
    ) {
      setIsConnection(true)
    } else {
      setIsConnection(false)
    }
  }, [
    dappletOperationGoing.length,
    isAddingUserList,
    isAddingUserTag,
    isLoadingDapplets,
    isLoadingMoreDapplets,
    isLoadingUserData,
    listOperationGoing.length,
    isInProgress,
    tagOperationGoing.length,
  ])

  return (
    <div className={styles.root}>
      <SvgIcon icon={'cloudNetwork'} />

      <span className={styles.text}>
        Extension state:{' '}
        {isConnection ? (
          <span className={styles.connection}>Connection...</span>
        ) : (
          <span className={styles.active}>Active</span>
        )}
      </span>
    </div>
  )
}

export default ExtensionState
