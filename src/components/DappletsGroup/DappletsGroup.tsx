import { FC, useEffect, useState } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import { MiddleSpinner } from 'uikit/Spinner/MiddleSpinner'
import { Spinner } from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles }) => {
  const { dapplets, isLoadingDapplets, isLoadingMoreDapplets, lastVisible } =
    useAppSelector(state => state.dapplets)
  const { isLoadingUserData } = useAppSelector(state => state.userData)

  const [loadMoreDapplets, setLoadMoreDapplets] = useState(false)

  const dispatch = useAppDispatch()

  const loadDapplets = async () => {
    await dispatch(getDapplets({ withLimit: 13, withStartAfter: lastVisible }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = function (event: any) {
    const scrollHeight = Number(event?.target?.documentElement?.scrollHeight)
    const scrollTop = Number(event?.target?.documentElement?.scrollTop)
    const innerHeight = window.innerHeight

    if (
      scrollHeight - (scrollTop + innerHeight) === 0 &&
      !isLoadingMoreDapplets
    ) {
      setLoadMoreDapplets(true)
    }
  }

  useEffect(() => {
    if (loadMoreDapplets && lastVisible)
      loadDapplets().finally(() => setLoadMoreDapplets(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreDapplets])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoadingUserData) void loadDapplets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUserData])

  return (
    <div className={cc([styles.root, userStyles ? userStyles : ''])}>
      {isLoadingDapplets || isLoadingUserData ? (
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

      {isLoadingMoreDapplets && (
        <div
          style={{
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MiddleSpinner />
        </div>
      )}
    </div>
  )
}

export default DappletsGroup
