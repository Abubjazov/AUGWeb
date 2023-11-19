import { renderHook } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import {
  mockedReduxProvider as Provider,
  mockedStore,
} from 'mockData/mockedReduxProvider'
import { setSearchString } from 'store/slices/dappletsSlice'

import { useSearchDapplets } from './useSearchDapplets'

describe('useSearchDapplets', () => {
  test('useSearchDapplets(): should return "default"', () => {
    const { result } = renderHook(() => useSearchDapplets(), {
      wrapper: Provider,
    })

    expect(result.current.items).toEqual(mockDapplets)
  })

  test('useSearchDapplets(): should return "search result"', () => {
    mockedStore.dispatch(setSearchString('B'))

    const { result } = renderHook(() => useSearchDapplets(), {
      wrapper: Provider,
    })

    expect(result.current.items).toEqual([mockDapplets[0]])
  })
})
