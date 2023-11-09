import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import AddUserTagModalContent from './AddUserTagModalContent'

describe('AddUserTagModalContent', () => {
  test('should render AddUserTagModalContent default', () => {
    const { asFragment } = render(
      <Provider>
        <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
