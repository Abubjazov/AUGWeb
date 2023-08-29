import { render } from '@testing-library/react'

import SelectSwitcher from './SelectSwitcher'

describe('SelectSwitcher', () => {
  test('should render SelectSwitcher default', () => {
    const { asFragment } = render(<SelectSwitcher />)

    expect(asFragment()).toMatchSnapshot()
  })
})
