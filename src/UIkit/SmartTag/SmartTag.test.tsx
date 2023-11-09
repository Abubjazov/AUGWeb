import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SmartTag, { ESmartTagMode } from './SmartTag'

describe('SmartTag', () => {
  test('should render SmartTag default', () => {
    expect(
      render(
        <Provider>
          <SmartTag tagId={'13'} label={'Smart Tag'} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag skeleton', () => {
    expect(
      render(
        <Provider>
          <SmartTag tagId={'13'} loading label={'Smart Tag'} />
        </Provider>,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <Provider>
          <SmartTag
            tagId={'13'}
            loading
            mode={ESmartTagMode.MY_TAG}
            label={'Smart Tag'}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <Provider>
          <SmartTag
            tagId={'13'}
            loading
            mode={ESmartTagMode.COMMUNITY_TAG}
            label={'Smart Tag'}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag"', () => {
    expect(
      render(
        <Provider>
          <SmartTag
            tagId={'13'}
            mode={ESmartTagMode.MY_TAG}
            label={'Smart Tag'}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "community tag"', () => {
    expect(
      render(
        <Provider>
          <SmartTag
            tagId={'13'}
            mode={ESmartTagMode.COMMUNITY_TAG}
            label={'Smart Tag'}
          />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
