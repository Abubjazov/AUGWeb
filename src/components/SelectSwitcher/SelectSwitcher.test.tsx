import { screen, fireEvent, render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SelectSwitcher from './SelectSwitcher'

describe('SelectSwitcher', () => {
  test('should render SelectSwitcher default', () => {
    const { asFragment } = render(
      <Provider>
        <SelectSwitcher />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened"', () => {
    const { asFragment } = render(
      <Provider>
        <SelectSwitcher />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })
})
