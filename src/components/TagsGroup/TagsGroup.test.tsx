import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'

import TagsGroup from './TagsGroup'

describe('TagsGroup', () => {
  test('should render TagsGroup default', () => {
    const { asFragment } = render(
      <Provider>
        <TagsGroup
          title={'Title'}
          tagMode={SmartTagMode.MY_TAG}
          menuOpened={true}
          tags={store.getState().myDapplets.myTags}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render TagsGroup after removal some MyTag from group', () => {
    render(
      <Provider>
        <TagsGroup
          title={'Title'}
          tagMode={SmartTagMode.MY_TAG}
          menuOpened={true}
          tags={store.getState().myDapplets.myTags}
        />
      </Provider>,
    )

    const myTagsState = store.getState().myDapplets.myTags.length

    fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])
    expect(store.getState().myDapplets.myTags.length).toEqual(myTagsState - 1)
  })
})
