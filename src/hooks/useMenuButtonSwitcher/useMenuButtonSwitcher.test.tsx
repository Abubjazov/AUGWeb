import { renderHook } from '@testing-library/react'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'
import { setMenuButtonsState } from 'store/slices/layoutSlice'

import { useMenuButtonSwitcher } from './useMenuButtonSwitcher'

describe('useMenuButtonSwitcher', () => {
  test('useMenuButtonSwitcher(): should return "default"', () => {
    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: MockedProvider,
    })

    expect(defaultMStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: undefined,
    })
  })

  test('useMenuButtonSwitcher(): should return "1"', () => {
    defaultMStore.dispatch(setMenuButtonsState(1))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: MockedProvider,
    })

    expect(defaultMStore.getState().dapplets.loadFilter).toEqual({
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
    defaultMStore.dispatch(setMenuButtonsState(2))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: MockedProvider,
    })

    expect(defaultMStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: {
        field: 'communityTags',
        operator: 'array-contains',
        comparisonValue: import.meta.env.VITE_AUG_APP_ESSENTIAL_ID as string,
      },
    })
  })

  test('useMenuButtonSwitcher(): should return "3"', () => {
    defaultMStore.dispatch(setMenuButtonsState(3))

    renderHook(() => useMenuButtonSwitcher(), {
      wrapper: MockedProvider,
    })

    expect(defaultMStore.getState().dapplets.loadFilter).toEqual({
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: {
        field: 'communityTags',
        operator: 'array-contains',
        comparisonValue: import.meta.env.VITE_AUG_APP_FINANCIAL_ID as string,
      },
    })
  })
})
