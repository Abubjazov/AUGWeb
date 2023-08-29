import { render } from '@testing-library/react'

import SearchInput from './SearchInput'

describe('SearchInput', () => {
  test('should render SearchInput default', () => {
    const { asFragment } = render(<SearchInput placeholder={'Placeholder'} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
