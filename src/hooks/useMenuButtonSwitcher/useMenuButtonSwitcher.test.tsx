import { renderHook } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  mockedStore,
} from 'mockData/mockedReduxProvider'
import { setMenuButtonsState } from 'store/slices/layoutSlice'

import { useMenuButtonSwitcher } from './useMenuButtonSwitcher'

describe('useMenuButtonSwitcher', () => {
  test('useMenuButtonSwitcher(): should return "default"', () => {
    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: Provider,
    })

    expect(mockedStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: undefined,
    })
  })

  test('useMenuButtonSwitcher(): should return "1"', () => {
    mockedStore.dispatch(setMenuButtonsState(1))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: Provider,
    })

    expect(mockedStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: {
        field: '__name__',
        operator: 'in',
        comparisonValue: [
          'ECNk2nNngwGXouvMpjWt',
          'ErcSJarm6Ck1rzq7yhHG',
          'T6hUx4HWCKtnIEfwQxYp',
        ],
      },
    })
  })

  test('useMenuButtonSwitcher(): should return "2"', () => {
    mockedStore.dispatch(setMenuButtonsState(2))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: Provider,
    })

    expect(mockedStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: {
        field: 'communityTags',
        operator: 'array-contains',
        comparisonValue: 'Uqwz4zkX4LlNYMoUGsTS',
      },
    })
  })

  test('useMenuButtonSwitcher(): should return "3"', () => {
    mockedStore.dispatch(setMenuButtonsState(3))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: Provider,
    })

    expect(mockedStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: {
        field: 'communityTags',
        operator: 'array-contains',
        comparisonValue: 'RgKDeqlQwkvghpq1n6p',
      },
    })
  })
})
