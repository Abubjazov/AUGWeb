import { render } from '@testing-library/react'

import BaseButton from '.'
import { BaseButtonMode } from './BaseButton'

describe('BaseButton', () => {
  test('should render BaseButton default', () => {
    expect(render(<BaseButton label={'Base Button'} />)).toMatchSnapshot()
  })

  test('should render BaseButton skeleton', () => {
    expect(
      render(<BaseButton loading label={'Base Button'} />),
    ).toMatchSnapshot()

    expect(
      render(<BaseButton loading disabled label={'Base Button'} />),
    ).toMatchSnapshot()

    expect(
      render(
        <BaseButton
          loading
          disabled
          mode={BaseButtonMode.CONTAINED_BLUE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <BaseButton
          loading
          mode={BaseButtonMode.CONTAINED_RED}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton disabled', () => {
    expect(
      render(<BaseButton disabled label={'Base Button'} />),
    ).toMatchSnapshot()

    expect(
      render(
        <BaseButton
          disabled
          mode={BaseButtonMode.OUTLINED_WHITE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "outlined"', () => {
    expect(
      render(
        <BaseButton
          mode={BaseButtonMode.OUTLINED_WHITE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-blue"', () => {
    expect(
      render(
        <BaseButton
          mode={BaseButtonMode.CONTAINED_BLUE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-red"', () => {
    expect(
      render(
        <BaseButton
          mode={BaseButtonMode.CONTAINED_RED}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })
})
