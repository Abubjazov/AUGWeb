import { renderHook } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'
import { setSearchString } from 'store/slices/dappletsSlice'

import { useDappletsGroupState } from './useDappletsGroupState'

describe('useDappletsGroupState', () => {
  test('useDappletsGroupState(): should return "default"', () => {
    const { result } = renderHook(() => useDappletsGroupState(), {
      wrapper: MockedProvider,
    })

    expect(result.current.items).toEqual(mockDapplets)
  })

  test('useSearchDapplets(): should return "search result"', () => {
    defaultMStore.dispatch(setSearchString('B'))

    const { result } = renderHook(() => useDappletsGroupState(), {
      wrapper: MockedProvider,
    })

    expect(result.current.items).toEqual([mockDapplets[0]])
  })
})
