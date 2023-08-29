import { fireEvent, screen, render } from '@testing-library/react'

import CreateInput from './CreateInput'

describe('CreateInput', () => {
  test('should render CreateInput default', () => {
    const { asFragment } = render(
      <CreateInput
        title={'Title'}
        placeholder={'Placeholder'}
        menuOpened={true}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render CreateInput after clicking Create', () => {
    const { asFragment } = render(
      <CreateInput
        title={'Title'}
        placeholder={'Placeholder'}
        menuOpened={true}
      />,
    )

    fireEvent.change(screen.getByTestId('create-input'), {
      target: { value: 'New tag' },
    })

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('base-button'))

    expect(asFragment()).toMatchSnapshot()
  })
})
