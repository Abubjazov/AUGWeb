import { render } from '@testing-library/react'

import NotAvailable from './NotAvailable'

describe('NotAvailable', () => {
  test('should render NotAvailable default', () => {
    const { asFragment } = render(<NotAvailable text={'Not available'} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
