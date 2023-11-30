import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SignUpForm from './SignUpForm'

describe('SignUpForm', () => {
  test('should render SignUpForm default', () => {
    const mockFn = vi.fn()

    const { asFragment } = render(
      <MockedProvider>
        <SignUpForm userFunction={mockFn} onSignUp={mockFn} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call SignUn function', () => {
    const mockFn = vi.fn()

    render(
      <MockedProvider>
        <SignUpForm userFunction={mockFn} onSignUp={mockFn} />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByText('Sign up'))

    expect(mockFn).toHaveBeenCalledTimes(0)

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'email@test.tst' },
    })

    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: '12345678' },
    })

    fireEvent.change(screen.getByPlaceholderText('password confirm'), {
      target: { value: '12345678' },
    })

    fireEvent.click(screen.getByText('Sign up'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
