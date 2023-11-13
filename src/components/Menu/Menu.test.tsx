import { screen, fireEvent, render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as router from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import * as asyncActions from 'services/authentication/authentication'
import * as actions from 'store/slices/layoutSlice'

import Menu from './Menu'

describe('Menu', () => {
  test('should render Menu default', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after clicking Arrow-button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-arrow-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-arrow-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after clicking Logo-button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-logo-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-logo-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after click to menu button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('menu-button')[1])

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setMenuState & logOut after click to "SignOut" menu button', () => {
    window.innerWidth = 1300

    const mockedLogOut = vi
      .spyOn(asyncActions, 'logOut')
      .mockImplementation(() => vi.fn())

    const mockedSetMenuState = vi.spyOn(actions, 'setMenuState')

    render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    fireEvent.click(screen.getByText('SignOut'))

    expect(mockedSetMenuState).toHaveBeenCalledTimes(1)
    expect(mockedSetMenuState).toHaveBeenCalledWith(false)

    expect(mockedLogOut).toHaveBeenCalledTimes(1)
  })

  test('should call setMenuState & setMenuButtonsState after click to "Editor’s Choice" menu button', () => {
    window.innerWidth = 1300

    const mockedSetMenuButtonsState = vi.spyOn(actions, 'setMenuButtonsState')

    const mockedSetMenuState = vi.spyOn(actions, 'setMenuState')

    render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    fireEvent.click(screen.getByText('Editor’s Choice'))

    expect(mockedSetMenuState).toHaveBeenCalledTimes(1)
    expect(mockedSetMenuState).toHaveBeenCalledWith(false)

    expect(mockedSetMenuButtonsState).toHaveBeenCalledTimes(1)
    expect(mockedSetMenuButtonsState).toHaveBeenCalledWith(1)
  })

  test('should call useNavigate after click to "Social Networks" menu button', () => {
    window.innerWidth = 1601

    const navigate = vi.fn()

    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    render(
      <Provider>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>,
    )

    fireEvent.click(screen.getByText('Social Networks'))

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/social')
  })
})
