import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from 'utils/testUtils'

import InstallButton from './InstallButton'
import {
  defaultMockState,
  mockDapplets,
  mockMyDapplets,
  mockMyTags,
} from '../../mockData/mockData'

describe('InstallButton', () => {
  test('should render InstallButton with INSTALL mode', () => {
    expect(
      renderWithProviders(<InstallButton dappletId={4} />, {
        preloadedState: {
          ...defaultMockState,
          myDapplets: {
            myDapplets: [...mockMyDapplets],
            myTags: [...mockMyTags],
          },
          dapplets: {
            dapplets: [...mockDapplets],
          },
        },
      }),
    ).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALLED mode', () => {
    expect(
      renderWithProviders(<InstallButton dappletId={1} />, {
        preloadedState: {
          ...defaultMockState,
          myDapplets: {
            myDapplets: [...mockMyDapplets],
            myTags: [...mockMyTags],
          },
          dapplets: {
            dapplets: [...mockDapplets],
          },
        },
      }),
    ).toMatchSnapshot()
  })

  test('should render InstallButton with skeleton', () => {
    expect(
      renderWithProviders(<InstallButton dappletId={1} loading />, {
        preloadedState: {
          ...defaultMockState,
          myDapplets: {
            myDapplets: [...mockMyDapplets],
            myTags: [...mockMyTags],
          },
          dapplets: {
            dapplets: [...mockDapplets],
          },
        },
      }),
    ).toMatchSnapshot()
  })

  test('should render InstallButton with UNINSTALL mode', () => {
    const { asFragment } = renderWithProviders(
      <InstallButton dappletId={1} />,
      {
        preloadedState: {
          ...defaultMockState,
          myDapplets: {
            myDapplets: [...mockMyDapplets],
            myTags: [...mockMyTags],
          },
          dapplets: {
            dapplets: [...mockDapplets],
          },
        },
      },
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()
  })
})
