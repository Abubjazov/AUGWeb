import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SingInForm from './SingInForm'

describe('SingInForm', () => {
  test('should render SingInForm default', () => {
    const { asFragment } = render(
      <Provider>
        <SingInForm userFunction={() => {}} onSignIn={() => {}} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
