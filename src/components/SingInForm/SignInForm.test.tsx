import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SignInForm from './SignInForm'

describe('SignInForm', () => {
  test('should render SignInForm default', () => {
    const mockFn = vi.fn()

    const { asFragment } = render(
      <MockedProvider>
        <SignInForm userFunction={mockFn} onSignIn={mockFn} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call SignIn function', () => {
    const mockFn = vi.fn()

    render(
      <MockedProvider>
        <SignInForm userFunction={mockFn} onSignIn={mockFn} />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByText('Sign in'))

    expect(mockFn).toHaveBeenCalledTimes(0)

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'email@test.tst' },
    })

    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: '12345678' },
    })

    fireEvent.click(screen.getByText('Sign in'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
