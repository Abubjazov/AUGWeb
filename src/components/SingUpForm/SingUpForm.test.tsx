import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SingUpForm from './SingUpForm'

describe('SingUpForm', () => {
  test('should render SingUpForm default', () => {
    const mockFn = vi.fn()

    const { asFragment } = render(
      <Provider>
        <SingUpForm userFunction={mockFn} onSignUp={mockFn} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call SignUn function', () => {
    const mockFn = vi.fn()

    render(
      <Provider>
        <SingUpForm userFunction={mockFn} onSignUp={mockFn} />
      </Provider>,
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
