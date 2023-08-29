import { render } from '@testing-library/react'

import ExtensionState from './ExtensionState'

describe('ExtensionState', () => {
  test('should render ExtensionState default', () => {
    const { asFragment } = render(<ExtensionState />)

    expect(asFragment()).toMatchSnapshot()
  })
})
