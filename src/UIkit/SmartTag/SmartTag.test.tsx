import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/userData'
import * as actions from 'store/slices/dappletsSlice'

import SmartTag, { ESmartTagMode } from './SmartTag'

describe('SmartTag', () => {
  test('should render SmartTag default', () => {
    const { asFragment } = render(
      <Provider>
        <SmartTag tagId={'13'} label={'Smart Tag'} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SmartTag "loading"', () => {
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
    const { asFragment } = render(
      <Provider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG}
          label={'Smart Tag'}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag modal"', () => {
    const { asFragment } = render(
      <Provider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG_MODAL}
          label={'Smart Tag'}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call addUserTagToDapplet function on mode: "my tag modal"', () => {
    const mockedAddUserTagToDapplet = vi.spyOn(
      asyncActions,
      'addUserTagToDapplet',
    )

    render(
      <Provider>
        <SmartTag
          dappletId={'d13'}
          tagId={'t13'}
          mode={ESmartTagMode.MY_TAG_MODAL}
          label={'Smart Tag'}
        />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId('smart-tag'))

    expect(mockedAddUserTagToDapplet).toHaveBeenCalledTimes(1)
    expect(mockedAddUserTagToDapplet).toHaveBeenCalledWith({
      dappletId: 'd13',
      userTagId: 't13',
    })
  })

  test('should call onClick function on mode: "my tag"', () => {
    const mockFn = vi.fn()

    render(
      <Provider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG}
          label={'Smart Tag'}
          onClick={mockFn}
        />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId('smart-tag-cross-button-13'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should call setTagDragData function when onDrag on mode: "my tag"', () => {
    const mockedSetTagDragData = vi.spyOn(actions, 'setTagDragData')

    render(
      <Provider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG}
          label={'Smart Tag'}
        />
      </Provider>,
    )

    fireEvent.dragStart(screen.getByTestId('smart-tag'))

    expect(mockedSetTagDragData).toHaveBeenCalledTimes(1)
    expect(mockedSetTagDragData).toHaveBeenCalledWith({
      mode: 'my-tag',
      tagId: '13',
    })
  })
})
