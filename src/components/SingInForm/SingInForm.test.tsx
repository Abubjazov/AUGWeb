import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SingInForm from './SingInForm'

describe('SingInForm', () => {
  test('should render SingInForm default', () => {
    const mockFn = vi.fn()

    const { asFragment } = render(
      <Provider>
        <SingInForm userFunction={mockFn} onSignIn={mockFn} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call SignIn function', () => {
    const mockFn = vi.fn()

    render(
      <Provider>
        <SingInForm userFunction={mockFn} onSignIn={mockFn} />
      </Provider>,
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
