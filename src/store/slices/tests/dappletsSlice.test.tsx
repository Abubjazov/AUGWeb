import { mockCommunityTags, mockDapplets } from 'mockData/mockData'
import { defaultMStore } from 'mockData/mockedReduxProvider'
import { getOrderBy } from 'utils/getOrderBy/getOrderBy'

import {
  ELastVisible,
  EOrderBy,
  EQueryOperator,
  resetDapplets,
  setDapplets,
  setIsLoadingDapplets,
  setLastVisible,
  setLoadFilter,
  setOrderBy,
  setSearchString,
  setTags,
} from '../dappletsSlice'

describe('dappletsSlice', () => {
  describe('reducers', () => {
    test('setIsLoadingDapplets', () => {
      defaultMStore.dispatch(setIsLoadingDapplets(true))
      expect(defaultMStore.getState().dapplets.isLoadingDapplets).toBe(true)

      defaultMStore.dispatch(setIsLoadingDapplets(false))
      expect(defaultMStore.getState().dapplets.isLoadingDapplets).toBe(false)
    })

    test('setLastVisible', () => {
      defaultMStore.dispatch(setLastVisible(ELastVisible.NO_MORE_DAPPLETS))
      expect(defaultMStore.getState().dapplets.lastVisible).toBe(
        ELastVisible.NO_MORE_DAPPLETS,
      )

      defaultMStore.dispatch(setLastVisible(undefined))
      expect(defaultMStore.getState().dapplets.lastVisible).toBe(undefined)
    })

    test('setSearchString', () => {
      defaultMStore.dispatch(setSearchString('search string'))
      expect(defaultMStore.getState().dapplets.searchString).toBe(
        'search string',
      )
    })

    test('setOrderBy', () => {
      defaultMStore.dispatch(setOrderBy(EOrderBy.ASC_BY_MARKET_CAP))
      expect(defaultMStore.getState().dapplets.orderBy).toBe(
        EOrderBy.ASC_BY_MARKET_CAP,
      )

      defaultMStore.dispatch(setOrderBy(undefined))
      expect(defaultMStore.getState().dapplets.orderBy).toBe(undefined)
    })

    test('setLoadFilter', () => {
      const filter = {
        withLimit: 3,
        withStartAfter: undefined,
        withWhere: {
          field: 'field',
          operator: EQueryOperator.ARRAY_CONTAINS,
          comparisonValue: 'value',
        },
      }

      defaultMStore.dispatch(setLoadFilter(filter))
      expect(defaultMStore.getState().dapplets.loadFilter).toEqual(filter)
    })

    test('setTags', () => {
      defaultMStore.dispatch(setTags(mockCommunityTags))
      expect(defaultMStore.getState().dapplets.tags).toEqual(mockCommunityTags)
    })

    test('setDapplets', () => {
      const payload = {
        dapplets: mockDapplets,
        lastVisible: undefined,
        add: false,
      }

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      defaultMStore.dispatch(setDapplets(payload))
      expect(defaultMStore.getState().dapplets.dapplets).toEqual(mockDapplets)

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      defaultMStore.dispatch(setOrderBy(EOrderBy.DESC_BY_NAME))
      const mockDappletsClone = structuredClone(mockDapplets).sort(
        getOrderBy(EOrderBy.DESC_BY_NAME),
      )
      defaultMStore.dispatch(setDapplets(payload))
      expect(defaultMStore.getState().dapplets.dapplets).toEqual(
        mockDappletsClone,
      )

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      defaultMStore.dispatch(resetDapplets())
      defaultMStore.dispatch(setOrderBy(undefined))

      defaultMStore.dispatch(
        setDapplets({
          ...payload,
          dapplets: mockDapplets.slice(0, 3),
          lastVisible: ELastVisible.NO_MORE_DAPPLETS,
        }),
      )
      expect(defaultMStore.getState().dapplets.lastVisible).toEqual(
        ELastVisible.NO_MORE_DAPPLETS,
      )
      defaultMStore.dispatch(
        setDapplets({
          ...payload,
          dapplets: mockDapplets.slice(3, 6),
          add: true,
        }),
      )
      expect(defaultMStore.getState().dapplets.dapplets).toEqual(
        mockDapplets.slice(0, 6),
      )

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      defaultMStore.dispatch(setOrderBy(EOrderBy.ASC_BY_NAME))
      defaultMStore.dispatch(
        setDapplets({
          dapplets: mockDapplets.slice(6, 8),
          lastVisible: undefined,
          add: true,
        }),
      )
      expect(defaultMStore.getState().dapplets.lastVisible).toEqual(
        ELastVisible.NO_MORE_DAPPLETS,
      )
      const mockDappletsSlice = mockDapplets
        .slice(0, 8)
        .sort(getOrderBy(EOrderBy.ASC_BY_NAME))
      expect(defaultMStore.getState().dapplets.dapplets).toEqual(
        mockDappletsSlice,
      )
    })
  })
})
