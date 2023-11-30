import { screen, fireEvent, render } from '@testing-library/react'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/userData'
import { ETagOperation } from 'store/slices/userDataSlice'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'

import TagsGroup from './TagsGroup'

describe('TagsGroup', () => {
  test('should render TagsGroup default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <TagsGroup
          title={'Title'}
          tagMode={ESmartTagMode.MY_TAG}
          menuOpened={true}
          tags={defaultMStore.getState().userData.userTags}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render TagsGroup default when empty "tags"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <TagsGroup
          title={'Title'}
          tagMode={ESmartTagMode.MY_TAG}
          menuOpened={true}
          tags={[]}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render TagsGroup default when "tagOperationGoing"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <TagsGroup
          title={'Title'}
          tagMode={ESmartTagMode.MY_TAG}
          menuOpened={true}
          tags={defaultMStore.getState().userData.userTags}
          tagOperationGoing={[
            {
              tagId: 'darP5Jyz8yirTMsfY9RP',
              operation: ETagOperation.REMOVE,
            },
            {
              tagId: 'JW3UFtZ5HgATcwldsJ1T',
              operation: ETagOperation.ADD_TO_DAPPLET,
            },
          ]}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call removeUserTag function', () => {
    const mockedRemoveUserTag = vi
      .spyOn(asyncActions, 'removeUserTag')
      .mockImplementation(() => vi.fn())

    render(
      <MockedProvider>
        <TagsGroup
          title={'Title'}
          tagMode={ESmartTagMode.MY_TAG}
          menuOpened={true}
          tags={defaultMStore.getState().userData.userTags}
        />
      </MockedProvider>,
    )

    fireEvent.click(
      screen.getByTestId('smart-tag-cross-button-6UKxNrMzte6RCWIlssvM'),
    )

    expect(mockedRemoveUserTag).toHaveBeenCalledTimes(1)
    expect(mockedRemoveUserTag).toHaveBeenCalledWith('6UKxNrMzte6RCWIlssvM')
  })
})
