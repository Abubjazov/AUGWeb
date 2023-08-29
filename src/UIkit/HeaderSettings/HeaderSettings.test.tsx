import { render } from '@testing-library/react'

import HeaderSettings from './HeaderSettings'

describe('HeaderSettings', () => {
  test('should render HeaderSettings default', () => {
    const { asFragment } = render(<HeaderSettings />)

    expect(asFragment()).toMatchSnapshot()
  })
})
