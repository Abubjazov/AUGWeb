import { render } from '@testing-library/react'

import Fallback from './Fallback'

describe('Fallback', () => {
  test('should render Fallback default', () => {
    const { asFragment } = render(<Fallback />)

    expect(asFragment()).toMatchSnapshot()
  })
})
