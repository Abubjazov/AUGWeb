import { render } from '@testing-library/react'

import Spinner from './Spinner'

describe('Spinner', () => {
  test('should render Spinner default', () => {
    const { asFragment } = render(<Spinner />)

    expect(asFragment()).toMatchSnapshot()
  })
})
