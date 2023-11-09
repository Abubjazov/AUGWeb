import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SingUpForm from './SingUpForm'

describe('SingUpForm', () => {
  test('should render SingUpForm default', () => {
    const { asFragment } = render(
      <Provider>
        <SingUpForm userFunction={() => {}} onSignUp={() => {}} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
