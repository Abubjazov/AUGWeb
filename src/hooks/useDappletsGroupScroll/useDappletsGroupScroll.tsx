import { useState, useEffect } from 'react'

import { useSearchDapplets } from 'hooks/useSearchDapplets/useSearchDapplets'
import { getDapplets } from 'services/dapplets/dapplets'
import { getUserData } from 'services/userData/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  ELastVisible,
  resetLastVisible,
  setLoadFilter,
} from 'store/slices/dappletsSlice'
import { setIsLoadingUserData } from 'store/slices/userDataSlice'

export enum EStatus {
  WAITING = 'witing',
  LOADING = 'loading',
  ADDING_DAPPLETS = 'adding dapplets',
  NO_DAPPLETS_AVAILABLE = 'No dapplets available',
}

export const useDappletsGroupScroll = () => {
  const { isLoadingDapplets, loadFilter, lastVisible } = useAppSelector(
    state => state.dapplets,
  )
  const { isLoadingUserData } = useAppSelector(state => state.userData)

  const { items } = useSearchDapplets()

  const [loadMoreDapplets, setLoadMoreDapplets] = useState(false)
  const [status, setStatus] = useState<EStatus>(EStatus.LOADING)

  const dispatch = useAppDispatch()

  const loadDapplets = async () => {
    await dispatch(getDapplets({ ...loadFilter }))
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
    if (isLoadingDapplets || isLoadingUserData) setStatus(EStatus.LOADING)
    if (!isLoadingDapplets && !isLoadingUserData && items?.length)
      setStatus(EStatus.WAITING)
    if (!isLoadingDapplets && !isLoadingUserData && !items?.length)
      setStatus(EStatus.NO_DAPPLETS_AVAILABLE)
    if (
      loadMoreDapplets &&
      lastVisible !== ELastVisible.NO_MORE_DAPPLETS &&
      !isLoadingDapplets
    )
      setStatus(EStatus.ADDING_DAPPLETS)
  }, [
    isLoadingDapplets,
    isLoadingUserData,
    items?.length,
    loadMoreDapplets,
    lastVisible,
  ])

  useEffect(() => {
    lastVisible !== ELastVisible.NO_MORE_DAPPLETS && setLoadMoreDapplets(false)
    lastVisible === ELastVisible.NO_MORE_DAPPLETS && setLoadMoreDapplets(true)
  }, [lastVisible])

  useEffect(() => {
    if (
      loadMoreDapplets &&
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

  return { status, items }
}
