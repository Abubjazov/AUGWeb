import { FC, useEffect, useState } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { getUserData } from 'services/userData/userData'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import {
  TLastVisible,
  clearDapplets,
  setLoadFilter,
} from 'store/slices/dappletsSlice'
import { setIsLoadingUserData } from 'store/slices/userDataSlice'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import Spinner from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'
import { getTags } from 'utils/getTags/getTags'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles }) => {
  const { menuButtonsState } = useAppSelector(state => state.layout)
  const { isLoadingDapplets, dapplets, tags, loadFilter } = useAppSelector(
    state => state.dapplets,
  )
  const { isLoadingUserData, userDapplets, userTags } = useAppSelector(
    state => state.userData,
  )

  const [isLoadingMoreDapplets, setIsLoadingMoreDapplets] = useState(false)

  // const [loadMoreDapplets, setLoadMoreDapplets] = useState(false)

  const dispatch = useAppDispatch()

  const loadDapplets = async () => {
    await dispatch(getDapplets({ ...loadFilter }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const scrollHandler = function (event: any) {
  // const scrollHeight = Number(event?.target?.documentElement?.scrollHeight)
  // const scrollTop = Number(event?.target?.documentElement?.scrollTop)
  // const innerHeight = window.innerHeight
  // if (
  //   scrollHeight - (scrollTop + innerHeight) === 0 &&
  //   !isLoadingMoreDapplets
  // ) {
  //   setLoadMoreDapplets(true)
  // }
  // }

  // useEffect(() => {
  //   if (loadMoreDapplets && lastVisible)
  //     loadDapplets().finally(() => setLoadMoreDapplets(false))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loadMoreDapplets])

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)

  //   return () => document.removeEventListener('scroll', scrollHandler)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    if (menuButtonsState === 0) {
      dispatch(
        setLoadFilter({
          withLimit: 13,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 1) {
      dispatch(
        setLoadFilter({
          withLimit: 2,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 2) {
      dispatch(
        setLoadFilter({
          withLimit: 3,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 3) {
      dispatch(
        setLoadFilter({
          withLimit: 4,
          withStartAfter: undefined,
        }),
      )
    }
  }, [dispatch, menuButtonsState])

  useEffect(() => {
    void dispatch(getUserData())

    return () => {
      dispatch(setIsLoadingUserData(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoadingUserData && !isLoadingDapplets) {
      void loadDapplets()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUserData, loadFilter])

  return (
    <div className={cc([styles.root, userStyles ? userStyles : ''])}>
      {isLoadingDapplets || isLoadingUserData || !dapplets ? (
        <div className={styles.fallback}>
          <Spinner />
        </div>
      ) : (
        dapplets.map(item => (
          <Dapplet
            key={nanoid()}
            dapplet={item}
            dappletUserTags={getTags(
              item.dappletId,
              ESmartTagMode.MY_TAG,
              dapplets,
              userDapplets,
              tags,
              userTags,
            )}
            dappletCommunityTags={getTags(
              item.dappletId,
              ESmartTagMode.COMMUNITY_TAG,
              dapplets,
              userDapplets,
              tags,
              userTags,
            )}
          />
        ))
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
          <Spinner width={100} />
        </div>
      )}
    </div>
  )
}

export default DappletsGroup
