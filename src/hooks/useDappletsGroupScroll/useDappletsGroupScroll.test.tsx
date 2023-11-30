import { renderHook } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import MockedProvider from 'mockData/mockedReduxProvider'

import { useDappletsGroupScroll } from './useDappletsGroupScroll'

describe('useDappletsGroupScroll', () => {
  test('useDappletsGroupScroll(): should return "default"', () => {
    const { result } = renderHook(() => useDappletsGroupScroll(), {
      wrapper: MockedProvider,
    })

    expect(result.current.status).toBe('loading')
    expect(result.current.items).toEqual(mockDapplets)
  })
})
