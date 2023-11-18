import { mockCommunityTags, mockDapplets } from 'mockData/mockData'
import { mockedStore } from 'mockData/mockedReduxProvider'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
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
  setTagDragData,
  setTags,
} from '../dappletsSlice'

describe('dappletsSlice', () => {
  describe('reducers', () => {
    test('setIsLoadingDapplets', () => {
      mockedStore.dispatch(setIsLoadingDapplets(true))
      expect(mockedStore.getState().dapplets.isLoadingDapplets).toBe(true)

      mockedStore.dispatch(setIsLoadingDapplets(false))
      expect(mockedStore.getState().dapplets.isLoadingDapplets).toBe(false)
    })

    test('setLastVisible', () => {
      mockedStore.dispatch(setLastVisible(ELastVisible.NO_MORE_DAPPLETS))
      expect(mockedStore.getState().dapplets.lastVisible).toBe(
        ELastVisible.NO_MORE_DAPPLETS,
      )

      mockedStore.dispatch(setLastVisible(undefined))
      expect(mockedStore.getState().dapplets.lastVisible).toBe(undefined)
    })

    test('setSearchString', () => {
      mockedStore.dispatch(setSearchString('search string'))
      expect(mockedStore.getState().dapplets.searchString).toBe('search string')
    })

    test('setOrderBy', () => {
      mockedStore.dispatch(setOrderBy(EOrderBy.ASC_BY_MARKET_CAP))
      expect(mockedStore.getState().dapplets.orderBy).toBe(
        EOrderBy.ASC_BY_MARKET_CAP,
      )

      mockedStore.dispatch(setOrderBy(undefined))
      expect(mockedStore.getState().dapplets.orderBy).toBe(undefined)
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

      mockedStore.dispatch(setLoadFilter(filter))
      expect(mockedStore.getState().dapplets.loadFilter).toEqual(filter)
    })

    test('setTags', () => {
      mockedStore.dispatch(setTags(mockCommunityTags))
      expect(mockedStore.getState().dapplets.tags).toEqual(mockCommunityTags)
    })

    test('setDapplets', () => {
      const payload = {
        dapplets: mockDapplets,
        lastVisible: undefined,
        add: false,
      }

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      mockedStore.dispatch(setDapplets(payload))
      expect(mockedStore.getState().dapplets.dapplets).toEqual(mockDapplets)

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      mockedStore.dispatch(setOrderBy(EOrderBy.DESC_BY_NAME))
      const mockDappletsClone = structuredClone(mockDapplets).sort(
        getOrderBy(EOrderBy.DESC_BY_NAME),
      )
      mockedStore.dispatch(setDapplets(payload))
      expect(mockedStore.getState().dapplets.dapplets).toEqual(
        mockDappletsClone,
      )

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      mockedStore.dispatch(resetDapplets())
      mockedStore.dispatch(setOrderBy(undefined))

      mockedStore.dispatch(
        setDapplets({
          ...payload,
          dapplets: mockDapplets.slice(0, 3),
          lastVisible: ELastVisible.NO_MORE_DAPPLETS,
        }),
      )
      expect(mockedStore.getState().dapplets.lastVisible).toEqual(
        ELastVisible.NO_MORE_DAPPLETS,
      )
      mockedStore.dispatch(
        setDapplets({
          ...payload,
          dapplets: mockDapplets.slice(3, 6),
          add: true,
        }),
      )
      expect(mockedStore.getState().dapplets.dapplets).toEqual(
        mockDapplets.slice(0, 6),
      )

      //Sub test for if >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      mockedStore.dispatch(setOrderBy(EOrderBy.ASC_BY_NAME))
      mockedStore.dispatch(
        setDapplets({
          dapplets: mockDapplets.slice(6, 8),
          lastVisible: undefined,
          add: true,
        }),
      )
      expect(mockedStore.getState().dapplets.lastVisible).toEqual(
        ELastVisible.NO_MORE_DAPPLETS,
      )
      const mockDappletsSlice = mockDapplets
        .slice(0, 8)
        .sort(getOrderBy(EOrderBy.ASC_BY_NAME))
      expect(mockedStore.getState().dapplets.dapplets).toEqual(
        mockDappletsSlice,
      )
    })

    test('setTagDragData', () => {
      mockedStore.dispatch(
        setTagDragData({
          tagId: 'tagId',
          mode: ESmartTagMode.MY_TAG_MODAL,
        }),
      )

      expect(mockedStore.getState().dapplets.tagDragData).toEqual({
        tagId: 'tagId',
        mode: ESmartTagMode.MY_TAG_MODAL,
      })

      mockedStore.dispatch(setTagDragData(undefined))

      expect(mockedStore.getState().dapplets.tagDragData).toBe(undefined)
    })
  })
})
