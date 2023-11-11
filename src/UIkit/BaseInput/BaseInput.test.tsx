import { render } from '@testing-library/react'

import BaseInput from '.'

describe('BaseInput', () => {
  test('should render BaseInput default', () => {
    expect(
      render(
        <BaseInput
          dataTestId={'base-input'}
          type={'text'}
          name={'base-input-text'}
          placeholder={'Enter text'}
          value={undefined}
          onChange={undefined}
          onBlur={undefined}
          errors={[]}
          isDirty={false}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseInput then isDirty & on input error', () => {
    expect(
      render(
        <BaseInput
          dataTestId={'base-input'}
          type={'text'}
          name={'base-input-text'}
          placeholder={'Enter text'}
          value={undefined}
          onChange={undefined}
          onBlur={undefined}
          errors={['Input error']}
          isDirty={true}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render BaseInput then isDirty & on input error with "errorWhite"', () => {
    expect(
      render(
        <BaseInput
          dataTestId={'base-input'}
          type={'text'}
          name={'base-input-text'}
          placeholder={'Enter text'}
          value={undefined}
          onChange={undefined}
          onBlur={undefined}
          errors={['Input error']}
          errorWhite
          isDirty={true}
        />,
      ),
    ).toMatchSnapshot()
  })
})
