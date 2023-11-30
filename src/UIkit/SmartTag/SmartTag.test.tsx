import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/userData'

import SmartTag, { ESmartTagMode } from './SmartTag'

describe('SmartTag', () => {
  test('should render SmartTag default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SmartTag tagId={'13'} label={'Smart Tag'} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SmartTag "loading"', () => {
    expect(
      render(
        <MockedProvider>
          <SmartTag tagId={'13'} loading label={'Smart Tag'} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <MockedProvider>
          <SmartTag
            tagId={'13'}
            loading
            mode={ESmartTagMode.MY_TAG}
            label={'Smart Tag'}
          />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()

    expect(
      render(
        <MockedProvider>
          <SmartTag
            tagId={'13'}
            loading
            mode={ESmartTagMode.COMMUNITY_TAG}
            label={'Smart Tag'}
          />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG}
          label={'Smart Tag'}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SmartTag mode: "my tag modal"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG_MODAL}
          label={'Smart Tag'}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call addUserTagToDapplet function on mode: "my tag modal"', () => {
    const mockedAddUserTagToDapplet = vi.spyOn(
      asyncActions,
      'addUserTagToDapplet',
    )

    render(
      <MockedProvider>
        <SmartTag
          dappletId={'d13'}
          tagId={'t13'}
          mode={ESmartTagMode.MY_TAG_MODAL}
          label={'Smart Tag'}
        />
      </MockedProvider>,
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
      <MockedProvider>
        <SmartTag
          tagId={'13'}
          mode={ESmartTagMode.MY_TAG}
          label={'Smart Tag'}
          onClick={mockFn}
        />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('smart-tag-cross-button-13'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
