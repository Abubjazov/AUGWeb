import { render } from '@testing-library/react'

import SmartTag, { SmartTagMode } from './SmartTag'

describe('SmartTag', () => {
  test('should render SmartTag default', () => {
    expect(render(<SmartTag label={'Smart Tag'} />)).toMatchSnapshot()
  })

  test('should render SmartTag skeleton', () => {
    expect(render(<SmartTag loading label={'Smart Tag'} />)).toMatchSnapshot()

    expect(
      render(
        <SmartTag loading mode={SmartTagMode.MY_TAG} label={'Smart Tag'} />,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <SmartTag
          loading
          mode={SmartTagMode.COMMUNITY_TAG}
          label={'Smart Tag'}
        />,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag"', () => {
    expect(
      render(<SmartTag mode={SmartTagMode.MY_TAG} label={'Smart Tag'} />),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "community tag"', () => {
    expect(
      render(
        <SmartTag mode={SmartTagMode.COMMUNITY_TAG} label={'Smart Tag'} />,
      ),
    ).toMatchSnapshot()
  })
})
