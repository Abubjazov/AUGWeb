import { render } from '@testing-library/react'

import WorkingOn from './WorkingOn'

describe('WorkingOn', () => {
  test('should render WorkingOn default', () => {
    const { asFragment } = render(<WorkingOn dsOpened={true} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render WorkingOn when the dapplet settings is closed', () => {
    const { asFragment } = render(<WorkingOn dsOpened={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
