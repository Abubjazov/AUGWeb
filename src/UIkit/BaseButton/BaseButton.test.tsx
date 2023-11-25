import { render } from '@testing-library/react'

import BaseButton from '.'
import { EBaseButtonMode } from './BaseButton'

describe('BaseButton', () => {
  test('should render BaseButton default', () => {
    expect(render(<BaseButton label={'Base Button'} />)).toMatchSnapshot()
  })

  test('should render BaseButton loading', () => {
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
          mode={EBaseButtonMode.CONTAINED_BLUE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <BaseButton
          loading
          mode={EBaseButtonMode.CONTAINED_RED}
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
          mode={EBaseButtonMode.OUTLINED_WHITE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "outlined"', () => {
    expect(
      render(
        <BaseButton
          mode={EBaseButtonMode.OUTLINED_WHITE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-blue"', () => {
    expect(
      render(
        <BaseButton
          mode={EBaseButtonMode.CONTAINED_BLUE}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-red"', () => {
    expect(
      render(
        <BaseButton
          mode={EBaseButtonMode.CONTAINED_RED}
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()
  })
})
