import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import { BrowserRouter } from 'react-router-dom'

import SocialPage from './SocialPage'

describe('SocialPage', () => {
  test('should render SocialPage', () => {
    const { asFragment } = render(
      <Provider>
        <BrowserRouter>
          <SocialPage />
        </BrowserRouter>
      </Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
