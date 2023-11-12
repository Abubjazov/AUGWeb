import { render } from '@testing-library/react'

import ValueDynamicsBar from './ValueDynamicsBar'

describe('ValueDynamicsBar', () => {
  test('should render ValueDynamicsBar default with positive value', () => {
    const { asFragment } = render(<ValueDynamicsBar value={'100'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render ValueDynamicsBar default with negative value', () => {
    const { asFragment } = render(<ValueDynamicsBar value={'-100'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render ValueDynamicsBar default title', () => {
    const { asFragment } = render(
      <ValueDynamicsBar value={'10.13'} title={'Title'} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
