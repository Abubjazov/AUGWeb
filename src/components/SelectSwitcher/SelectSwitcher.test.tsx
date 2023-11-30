import { screen, fireEvent, render } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { EOrderBy } from 'store/slices/dappletsSlice'
import * as actions from 'store/slices/dappletsSlice'

import SelectSwitcher from './SelectSwitcher'

describe('SelectSwitcher', () => {
  test('should render SelectSwitcher default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened" & switched to "EOrderBy.ASC_BY_NAME"', () => {
    const mockedSetOrderBy = vi.spyOn(actions, 'setOrderBy')

    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText(EOrderBy.ASC_BY_NAME))

    expect(asFragment()).toMatchSnapshot()

    expect(mockedSetOrderBy).toHaveBeenCalledTimes(1)
    expect(mockedSetOrderBy).toHaveBeenCalledWith(EOrderBy.ASC_BY_NAME)

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened" & switched to "EOrderBy.DESC_BY_MARKET_CAP"', () => {
    const mockedSetOrderBy = vi.spyOn(actions, 'setOrderBy')

    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText(EOrderBy.DESC_BY_MARKET_CAP))

    expect(asFragment()).toMatchSnapshot()

    expect(mockedSetOrderBy).toHaveBeenCalledTimes(1)
    expect(mockedSetOrderBy).toHaveBeenCalledWith(EOrderBy.DESC_BY_MARKET_CAP)

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened" & switched to "EOrderBy.DESC_BY_NAME"', () => {
    const mockedSetOrderBy = vi.spyOn(actions, 'setOrderBy')

    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText(EOrderBy.DESC_BY_NAME))

    expect(asFragment()).toMatchSnapshot()

    expect(mockedSetOrderBy).toHaveBeenCalledTimes(1)
    expect(mockedSetOrderBy).toHaveBeenCalledWith(EOrderBy.DESC_BY_NAME)

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SelectSwitcher "Dropdown opened" & switched to "EOrderBy.ASC_BY_MARKET_CAP"', () => {
    const mockedSetOrderBy = vi.spyOn(actions, 'setOrderBy')

    const { asFragment } = render(
      <MockedProvider>
        <SelectSwitcher />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText(EOrderBy.ASC_BY_MARKET_CAP))

    expect(asFragment()).toMatchSnapshot()

    expect(mockedSetOrderBy).toHaveBeenCalledTimes(1)
    expect(mockedSetOrderBy).toHaveBeenCalledWith(EOrderBy.ASC_BY_MARKET_CAP)

    fireEvent.click(screen.getByTestId('open-dropdown'))

    expect(asFragment()).toMatchSnapshot()
  })
})
