import { FC, useEffect } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import {
  EStatus,
  useDappletsGroupState,
} from 'hooks/useDappletsGroupState/useDappletsGroupState'
import { nanoid } from 'nanoid'
import { useInView } from 'react-intersection-observer'
import { getDapplets } from 'store/asyncThunks/dapplets'
import { getUserData } from 'store/asyncThunks/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  ELastVisible,
  setLastVisible,
  setLoadFilter,
} from 'store/slices/dappletsSlice'
import { setIsLoadingUserData } from 'store/slices/userDataSlice'
import NotAvailable from 'uikit/NotAvailable'
import Spinner from 'uikit/Spinner/Spinner'
import { getTags } from 'utils/getTags/getTags'

import styles from './DappletsGroup.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DappletsGroupProps {}

const DappletsGroup: FC<DappletsGroupProps> = () => {
  const { tags, loadFilter, isLoadingDapplets, lastVisible } = useAppSelector(
    state => state.dapplets,
  )
  const { userDapplets, userTags, isLoadingUserData } = useAppSelector(
    state => state.userData,
  )

  const { items, status } = useDappletsGroupState()

  const { ref, inView } = useInView()

  const dispatch = useAppDispatch()

  const loadDapplets = async () => {
    await dispatch(getDapplets({ ...loadFilter }))
  }

  useEffect(() => {
    if (
      inView &&
      lastVisible !== ELastVisible.NO_MORE_DAPPLETS &&
      !isLoadingDapplets
    ) {
      dispatch(
        setLoadFilter({
          ...loadFilter,
          withStartAfter: lastVisible,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    if (!isLoadingUserData && !isLoadingDapplets) {
      void loadDapplets()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUserData, loadFilter])

  useEffect(() => {
    void dispatch(getUserData())

    return () => {
      dispatch(setIsLoadingUserData(true))
      dispatch(setLastVisible(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.root}>
      {status === EStatus.LOADING && (
        <div className={styles.fallback}>
          <Spinner />
        </div>
      )}

      {(status === EStatus.WAITING || status === EStatus.ADDING_DAPPLETS) &&
        items &&
        items.map(item => (
          <Dapplet
            key={nanoid()}
            dapplet={item}
            dappletUserTags={getTags(item.dappletId, userTags, userDapplets)}
            dappletCommunityTags={getTags(item.dappletId, tags, items)}
          />
        ))}

      {status === EStatus.NO_DAPPLETS_AVAILABLE && (
        <NotAvailable text={'No dapplets available'} />
      )}

      {status === EStatus.ADDING_DAPPLETS && (
        <div className={styles.spinner}>
          <Spinner width={100} height={50} strokeWidth={3} />
        </div>
      )}

      {lastVisible !== ELastVisible.NO_MORE_DAPPLETS && (
        <div ref={ref} style={{ height: 0 }}></div>
      )}
    </div>
  )
}

export default DappletsGroup
