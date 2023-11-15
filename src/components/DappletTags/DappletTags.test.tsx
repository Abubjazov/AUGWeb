import { fireEvent, render, screen } from '@testing-library/react'
import * as asyncActions from 'store/asyncThunks/userData'
import AddUserTagModalContent from 'components/AddUserTagModalContent'
import { mockCommunityTags, mockUserTags } from 'mockData/mockData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'
import { EDappletOperation } from 'store/slices/userDataSlice'

import DappletTags from './DappletTags'

describe('DappletTags', () => {
  test('should render DappletTags default & dappletState is false', () => {
    const { asFragment } = render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={false}
          dappletUserTags={mockUserTags.slice(0, 3)}
          dappletCommunityTags={mockCommunityTags.slice(0, 2)}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletTags default & dappletState is true', () => {
    const { asFragment } = render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={true}
          dappletUserTags={mockUserTags.slice(0, 3)}
          dappletCommunityTags={mockCommunityTags.slice(0, 2)}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "dappletOperationGoing"', () => {
    const { asFragment } = render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={true}
          dappletUserTags={mockUserTags.slice(0, 3)}
          dappletCommunityTags={mockCommunityTags.slice(0, 2)}
          dappletOperationGoing={[
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              userTagId: 'JW3UFtZ5HgATcwldsJ1T',
              operation: EDappletOperation.REMOVE_USER_TAG,
            },
          ]}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call installDapplet function on delete tag button click', () => {
    const mockedRemoveUserTagFromDapplet = vi
      .spyOn(asyncActions, 'removeUserTagFromDapplet')
      .mockImplementation(() => vi.fn())

    render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={true}
          dappletUserTags={mockUserTags.slice(0, 3)}
          dappletCommunityTags={mockCommunityTags.slice(0, 2)}
        />
      </Provider>,
    )

    fireEvent.click(
      screen.getByTestId('smart-tag-cross-button-JW3UFtZ5HgATcwldsJ1T'),
    )

    expect(mockedRemoveUserTagFromDapplet).toHaveBeenCalledTimes(1)
    expect(mockedRemoveUserTagFromDapplet).toHaveBeenCalledWith({
      dappletId: 'ECNk2nNngwGXouvMpjWt',
      userTagId: 'JW3UFtZ5HgATcwldsJ1T',
    })
  })

  test('should render DappletTags then windowInnerWidth <= 880 & dappletState is false', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={false}
          dappletUserTags={mockUserTags.slice(0, 2)}
          dappletCommunityTags={mockCommunityTags.slice(0, 1)}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletTags then windowInnerWidth <= 880 & dappletState is true', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={true}
          dappletUserTags={mockUserTags.slice(0, 2)}
          dappletCommunityTags={mockCommunityTags.slice(0, 1)}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setModalInner & setModalState functions on tag click then windowInnerWidth <= 880', () => {
    window.innerWidth = 880

    const mockedSetModalInner = vi.spyOn(actions, 'setModalInner')
    const mockedSetModalState = vi.spyOn(actions, 'setModalState')

    render(
      <Provider>
        <DappletTags
          dappletId={'ECNk2nNngwGXouvMpjWt'}
          dappletState={true}
          dappletUserTags={mockUserTags.slice(0, 2)}
          dappletCommunityTags={mockCommunityTags.slice(0, 1)}
        />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId('add-tag-button'))

    expect(mockedSetModalInner).toHaveBeenCalledTimes(1)
    expect(mockedSetModalInner).toHaveBeenCalledWith(
      <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />,
    )

    expect(mockedSetModalState).toHaveBeenCalledTimes(1)
    expect(mockedSetModalState).toHaveBeenCalledWith(true)
  })
})
