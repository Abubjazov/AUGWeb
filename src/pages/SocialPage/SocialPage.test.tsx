import { render } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { BrowserRouter } from 'react-router-dom'

import SocialPage from './SocialPage'

describe('SocialPage', () => {
  test('should render SocialPage', () => {
    const { asFragment } = render(
      <MockedProvider>
        <BrowserRouter>
          <SocialPage />
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
