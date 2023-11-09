import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import StandardModal from './StandardModal'

describe('StandardModal', () => {
  test('should render StandardModal default', () => {
    const { asFragment } = render(
      <Provider>
        <StandardModal />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
