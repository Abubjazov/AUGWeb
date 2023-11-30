import { render } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SearchGroup from './SearchGroup'

describe('SearchGroup', () => {
  test('should render SearchGroup default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SearchGroup />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
