import { render } from '@testing-library/react'

import BaseButton from '.'

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
          mode="contained-blue"
          label={'Base Button'}
        />,
      ),
    ).toMatchSnapshot()

    expect(
      render(<BaseButton loading mode="contained-red" label={'Base Button'} />),
    ).toMatchSnapshot()
  })

  test('should render BaseButton disabled', () => {
    expect(
      render(<BaseButton disabled label={'Base Button'} />),
    ).toMatchSnapshot()

    expect(
      render(<BaseButton disabled mode="outlined" label={'Base Button'} />),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "outlined"', () => {
    expect(
      render(<BaseButton mode="outlined" label={'Base Button'} />),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "outlined"', () => {
    expect(
      render(<BaseButton mode="outlined" label={'Base Button'} />),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-blue"', () => {
    expect(
      render(<BaseButton mode="contained-blue" label={'Base Button'} />),
    ).toMatchSnapshot()
  })

  test('should render BaseButton mode: "contained-red"', () => {
    expect(
      render(<BaseButton mode="contained-red" label={'Base Button'} />),
    ).toMatchSnapshot()
  })
})
