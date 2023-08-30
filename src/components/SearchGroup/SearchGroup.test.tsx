import { render } from '@testing-library/react'

import SearchGroup from './SearchGroup'

describe('SearchGroup', () => {
  test('should render SearchGroup default', () => {
    const { asFragment } = render(<SearchGroup />)

    expect(asFragment()).toMatchSnapshot()
  })
})
