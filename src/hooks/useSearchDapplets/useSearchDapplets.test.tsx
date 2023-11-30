import { renderHook } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'
import { setSearchString } from 'store/slices/dappletsSlice'

import { useSearchDapplets } from './useSearchDapplets'

describe('useSearchDapplets', () => {
  test('useSearchDapplets(): should return "default"', () => {
    const { result } = renderHook(() => useSearchDapplets(), {
      wrapper: MockedProvider,
    })

    expect(result.current.items).toEqual(mockDapplets)
  })

  test('useSearchDapplets(): should return "search result"', () => {
    defaultMStore.dispatch(setSearchString('B'))

    const { result } = renderHook(() => useSearchDapplets(), {
      wrapper: MockedProvider,
    })

    expect(result.current.items).toEqual([mockDapplets[0]])
  })
})
