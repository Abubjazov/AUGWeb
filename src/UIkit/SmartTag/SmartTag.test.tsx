import { render } from '@testing-library/react'

import SmartTag, { SmartTagMode } from './SmartTag'

describe('SmartTag', () => {
  test('should render SmartTag default', () => {
    expect(
      render(<SmartTag tagId={13} label={'Smart Tag'} />),
    ).toMatchSnapshot()
  })

  test('should render SmartTag skeleton', () => {
    expect(
      render(<SmartTag tagId={13} loading label={'Smart Tag'} />),
    ).toMatchSnapshot()

    expect(
      render(
        <SmartTag
          tagId={13}
          loading
          mode={SmartTagMode.MY_TAG}
          label={'Smart Tag'}
        />,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <SmartTag
          tagId={13}
          loading
          mode={SmartTagMode.COMMUNITY_TAG}
          label={'Smart Tag'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag"', () => {
    expect(
      render(
        <SmartTag tagId={13} mode={SmartTagMode.MY_TAG} label={'Smart Tag'} />,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "community tag"', () => {
    expect(
      render(
        <SmartTag
          tagId={13}
          mode={SmartTagMode.COMMUNITY_TAG}
          label={'Smart Tag'}
        />,
      ),
    ).toMatchSnapshot()
  })
})
