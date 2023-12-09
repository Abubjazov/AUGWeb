import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { EQueryOperator, setLoadFilter } from 'store/slices/dappletsSlice'

export const useMenuButtonSwitcher = () => {
  const { loadFilter } = useAppSelector(state => state.dapplets)
  const { userDapplets } = useAppSelector(state => state.userData)
  const { menuButtonsState } = useAppSelector(state => state.layout)

  const dispatch = useAppDispatch()

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
              comparisonValue: import.meta.env
                .VITE_AUG_APP_ESSENTIAL_ID as string,
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
              comparisonValue: import.meta.env
                .VITE_AUG_APP_FINANCIAL_ID as string,
            },
            withStartAfter: undefined,
          }),
        )
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuButtonsState])
}
