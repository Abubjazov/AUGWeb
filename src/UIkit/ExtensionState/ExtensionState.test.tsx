import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import { mokedStore } from 'mockData/mockedReduxProvider'
import { setIsLoadingUserData } from 'store/slices/userDataSlice'

import ExtensionState from './ExtensionState'

describe('ExtensionState', () => {
  test('should render ExtensionState "Active"', () => {
    const { asFragment } = render(
      <Provider>
        <ExtensionState />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render ExtensionState "Connection..."', () => {
    mokedStore.dispatch(setIsLoadingUserData(true))

    const { asFragment } = render(
      <Provider>
        <ExtensionState />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
