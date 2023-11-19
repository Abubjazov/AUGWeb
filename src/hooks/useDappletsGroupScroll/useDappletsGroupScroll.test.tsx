import { renderHook } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import { useDappletsGroupScroll } from './useDappletsGroupScroll'

describe('useDappletsGroupScroll', () => {
  test('useDappletsGroupScroll(): should return "default"', () => {
    const { result } = renderHook(() => useDappletsGroupScroll(), {
      wrapper: Provider,
    })

    expect(result.current.status).toBe('loading')
    expect(result.current.items).toEqual(mockDapplets)
  })
})
