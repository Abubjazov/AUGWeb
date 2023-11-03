import { FC, useEffect, useState } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { getUserData } from 'services/userData/userData'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import {
  ELastVisible,
  EQueryOperator,
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
    await dispatch(getDapplets({ ...loadFilter })).finally(
      () =>
        lastVisible !== ELastVisible.NO_MORE_DAPPLETS &&
        setLoadMoreDapplets(false),
    )
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
    switch (menuButtonsState) {
      case 0:
        dispatch(
          setLoadFilter({
            ...loadFilter,
            withWhere: undefined,
            withStartAfter: undefined,
          }),
        )
        break

      case 1:
        dispatch(
          setLoadFilter({
            ...loadFilter,
            withWhere: {
              field: '__name__',
              operator: EQueryOperator.IN,
              comparisonValue: userDapplets.map(dapplet => dapplet.dappletId),
            },
            withStartAfter: undefined,
          }),
        )
        break

      case 2:
        dispatch(
          setLoadFilter({
            ...loadFilter,
            withWhere: {
              field: 'communityTags',
              operator: EQueryOperator.ARRAY_CONTAINS,
              comparisonValue: 'Uqwz4zkX4LlNYMoUGsTS',
            },
            withStartAfter: undefined,
          }),
        )
        break

      case 3:
        dispatch(
          setLoadFilter({
            ...loadFilter,
            withWhere: {
              field: 'communityTags',
              operator: EQueryOperator.ARRAY_CONTAINS,
              comparisonValue: 'RgKDeqlQwkvghpq1n6p',
            },
            withStartAfter: undefined,
          }),
        )
        break

      default:
        break
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuButtonsState])

  useEffect(() => {
    if (
      loadMoreDapplets &&
      lastVisible !== ELastVisible.NO_MORE_DAPPLETS &&
      !isLoadingDapplets
    )
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withStartAfter: lastVisible,
        }),
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreDapplets])

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
      {isLoadingDapplets || isLoadingUserData ? (
        <div className={styles.fallback}>
          <Spinner />
        </div>
      ) : dapplets?.length ? (
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
      ) : (
        <div className={styles.fallback}>
          <div className={styles['stars']}>
            <div className={styles['central-body']}>
              <span className={styles.text}>No dapplets available</span>
              <div className={styles['objects']}>
                <img
                  className={styles['object-rocket']}
                  src="/images/rocket.svg"
                  width="40px"
                />
                <div className={styles['earth-moon']}>
                  <img
                    className={styles['object-earth']}
                    src="/images/earth.svg"
                    width="100px"
                  />
                  <img
                    className={styles['object-moon']}
                    src="/images/moon.svg"
                    width="80px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loadMoreDapplets && lastVisible !== ELastVisible.NO_MORE_DAPPLETS && (
        <div
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: 'calc(50% - 50px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner width={100} height={50} strokeWidth={3} />
        </div>
      )}
    </div>
  )
}

export default DappletsGroup
