import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SearchGroup from './SearchGroup'

describe('SearchGroup', () => {
  test('should render SearchGroup default', () => {
    const { asFragment } = render(
      <Provider>
        <SearchGroup />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
