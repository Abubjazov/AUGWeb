import { render } from '@testing-library/react'

import Fallback from './Fallback'

describe('Fallback', () => {
  test('should render Fallback default', () => {
    const { asFragment } = render(<Fallback height={100} width={100} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
