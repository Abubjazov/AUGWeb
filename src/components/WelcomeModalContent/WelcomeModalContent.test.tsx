import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

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
})
