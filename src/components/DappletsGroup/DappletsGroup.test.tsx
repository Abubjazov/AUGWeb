import { render } from '@testing-library/react'
import * as hooks from 'hooks/useDappletsGroupState/useDappletsGroupState'
import { EStatus } from 'hooks/useDappletsGroupState/useDappletsGroupState'
import { mockDapplets } from 'mockData/mockData'
import MockedProvider from 'mockData/mockedReduxProvider'

import DappletsGroup from './DappletsGroup'

describe('DappletsGroup', () => {
  beforeAll(() => {
    const intersectionObserverMock = () => ({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })

    window.IntersectionObserver = vi
      .fn()
      .mockImplementation(intersectionObserverMock)
  })

  test('should render DappletsGroup default', () => {
    vi.spyOn(hooks, 'useDappletsGroupState').mockImplementation(() => ({
      status: EStatus.WAITING,
      items: mockDapplets,
    }))

    const { asFragment } = render(
      <MockedProvider>
        <DappletsGroup />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletsGroup "loading"', () => {
    vi.spyOn(hooks, 'useDappletsGroupState').mockImplementation(() => ({
      status: EStatus.LOADING,
      items: mockDapplets,
    }))

    const { asFragment } = render(
      <MockedProvider>
        <DappletsGroup />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletsGroup on "adding dapplets"', () => {
    vi.spyOn(hooks, 'useDappletsGroupState').mockImplementation(() => ({
      status: EStatus.ADDING_DAPPLETS,
      items: mockDapplets,
    }))

    const { asFragment } = render(
      <MockedProvider>
        <DappletsGroup />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletsGroup on "no dapplets available"', () => {
    vi.spyOn(hooks, 'useDappletsGroupState').mockImplementation(() => ({
      status: EStatus.NO_DAPPLETS_AVAILABLE,
      items: mockDapplets,
    }))

    const { asFragment } = render(
      <MockedProvider>
        <DappletsGroup />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
