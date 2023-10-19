import { FC, memo, useEffect } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import { Spinner } from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles = '' }) => {
  const { dapplets, isLoadingDapplets } = useAppSelector(
    state => state.dapplets,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getDapplets())
  }, [dispatch])

  return (
    <div className={cc([styles.root, userStyles])}>
      {isLoadingDapplets ? (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </div>
      ) : (
        dapplets.map(item => <Dapplet key={nanoid()} dapplet={item} />)
      )}
    </div>
  )
}

export default memo(DappletsGroup)
