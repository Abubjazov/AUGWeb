import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/authentication'

import WelcomeModalContent from './WelcomeModalContent'

describe('WelcomeModalContent', () => {
  test('should render WelcomeModalContent default', () => {
    const { asFragment } = render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render WelcomeModalContent with "Sign up"', () => {
    const { asFragment } = render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sign up'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render WelcomeModalContent with "Sign in"', () => {
    const { asFragment } = render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sign in'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render WelcomeModalContent default after close "Sign in"', () => {
    const { asFragment } = render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sign in'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText('Cancel'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call createUser function', () => {
    const mockedCreateUser = vi
      .spyOn(asyncActions, 'createUser')
      .mockImplementation(() => vi.fn())

    render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sign up'))

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'email@example.com' },
    })

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: '12345678' },
    })

    fireEvent.change(screen.getByTestId('confirm-password-input'), {
      target: { value: '12345678' },
    })

    fireEvent.click(screen.getByText('Sign up'))

    expect(mockedCreateUser).toHaveBeenCalledTimes(1)
    expect(mockedCreateUser).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: '12345678',
    })
  })

  test('should call logIn function', () => {
    const mockedLogIn = vi
      .spyOn(asyncActions, 'logIn')
      .mockImplementation(() => vi.fn())

    render(
      <Provider>
        <WelcomeModalContent />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sign in'))

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'email@example.com' },
    })

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: '12345678' },
    })

    fireEvent.click(screen.getByText('Sign in'))

    expect(mockedLogIn).toHaveBeenCalledTimes(1)
    expect(mockedLogIn).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: '12345678',
    })
  })
})
