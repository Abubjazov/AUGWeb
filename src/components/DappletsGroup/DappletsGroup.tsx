import { FC, useEffect, useState } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { getUserData } from 'services/userData/userData'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import {
  ELastVisible,
  resetLastVisible,
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
  const { isLoadingDapplets, dapplets, tags, loadFilter, lastVisible } =
    useAppSelector(state => state.dapplets)
  const { isLoadingUserData, userDapplets, userTags } = useAppSelector(
    state => state.userData,
  )

  const [loadMoreDapplets, setLoadMoreDapplets] = useState(false)

  const dispatch = useAppDispatch()

  const loadDapplets = async () => {
    await dispatch(getDapplets({ ...loadFilter })).finally(() => {
      setLoadMoreDapplets(false)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = (event: any) => {
    const scrollHeight = Number(event?.target?.documentElement?.scrollHeight)
    const scrollTop = Number(event?.target?.documentElement?.scrollTop)
    const innerHeight = window.innerHeight

    if (scrollHeight - (scrollTop + innerHeight) === 0) {
      setLoadMoreDapplets(true)
    }
  }

  useEffect(() => {
    console.log('wSA: ' + loadFilter.withStartAfter)
    console.log('lV: ' + lastVisible)
  }, [loadFilter, lastVisible])

  useEffect(() => {
    if (lastVisible === ELastVisible.NO_MORE_DAPPLETS)
      setLoadMoreDapplets(false)

    if (loadMoreDapplets && lastVisible !== ELastVisible.NO_MORE_DAPPLETS)
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withStartAfter: lastVisible,
        }),
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreDapplets, lastVisible])

  useEffect(() => {
    if (menuButtonsState === 0) {
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withLimit: 13,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 1) {
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withLimit: 2,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 2) {
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withLimit: 3,
          withStartAfter: undefined,
        }),
      )
    }

    if (menuButtonsState === 3) {
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withLimit: 4,
          withStartAfter: undefined,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, menuButtonsState])

  useEffect(() => {
    if (!isLoadingUserData && !isLoadingDapplets) {
      void loadDapplets()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUserData, loadFilter])

  useEffect(() => {
    void dispatch(getUserData())
    document.addEventListener('scroll', scrollHandler)

    return () => {
      dispatch(setIsLoadingUserData(true))
      dispatch(resetLastVisible())
      document.removeEventListener('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      {loadMoreDapplets && (
        <div
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: 'calc(50% - 50px)',
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
