import { useState, useEffect } from 'react'

import { useSearchDapplets } from 'hooks/useSearchDapplets/useSearchDapplets'
import { useAppSelector } from 'store/hooks'

export enum EStatus {
  WAITING = 'waiting',
  LOADING = 'loading',
  ADDING_DAPPLETS = 'adding dapplets',
  NO_DAPPLETS_AVAILABLE = 'No dapplets available',
}

export const useDappletsGroupState = () => {
  const { isLoadingDapplets, isLoadingMoreDapplets } = useAppSelector(
    state => state.dapplets,
  )
  const { isLoadingUserData } = useAppSelector(state => state.userData)

  const { items } = useSearchDapplets()

  const [status, setStatus] = useState<EStatus>(EStatus.LOADING)

  useEffect(() => {
    if (isLoadingDapplets || isLoadingUserData) setStatus(EStatus.LOADING)
    if (!isLoadingDapplets && !isLoadingUserData && items?.length)
      setStatus(EStatus.WAITING)
    if (!isLoadingDapplets && !isLoadingUserData && !items?.length)
      setStatus(EStatus.NO_DAPPLETS_AVAILABLE)
    if (isLoadingMoreDapplets && !isLoadingDapplets)
      setStatus(EStatus.ADDING_DAPPLETS)
  }, [
    isLoadingDapplets,
    isLoadingUserData,
    items?.length,
    isLoadingMoreDapplets,
  ])

  return { items, status }
}
