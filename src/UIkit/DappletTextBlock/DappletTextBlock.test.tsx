import { render } from '@testing-library/react'

import DappletTextBlock from './DappletTextBlock'

describe('DappletTextBlock', () => {
  test('should render DappletTextBlock default', () => {
    const { asFragment } = render(
      <DappletTextBlock title={'Title'} text={'Some text'} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
