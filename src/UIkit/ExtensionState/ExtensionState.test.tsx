import { render } from '@testing-library/react'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'
import { setIsLoadingUserData } from 'store/slices/userDataSlice'

import ExtensionState from './ExtensionState'

describe('ExtensionState', () => {
  test('should render ExtensionState "Active"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <ExtensionState />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render ExtensionState "Connection..."', () => {
    defaultMStore.dispatch(setIsLoadingUserData(true))

    const { asFragment } = render(
      <MockedProvider>
        <ExtensionState />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
