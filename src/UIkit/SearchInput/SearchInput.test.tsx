import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/dappletsSlice'

import SearchInput from './SearchInput'

describe('SearchInput', () => {
  test('should render SearchInput default', () => {
    const { asFragment } = render(
      <Provider>
        <SearchInput placeholder={'Placeholder'} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setSearchString function on input text', async () => {
    const mockedSetSearchString = vi.spyOn(actions, 'setSearchString')

    const { asFragment } = render(
      <Provider>
        <SearchInput placeholder={'Placeholder'} />
      </Provider>,
    )

    function delay(timeout: number | undefined) {
      return new Promise((resolve: (value: unknown) => void) => {
        setTimeout(resolve, timeout)
      })
    }

    expect(mockedSetSearchString).toHaveBeenCalledTimes(1)
    expect(mockedSetSearchString).toHaveBeenCalledWith('')

    expect(asFragment()).toMatchSnapshot()

    fireEvent.change(screen.getByPlaceholderText('Placeholder'), {
      target: { value: 'Search string' },
    })

    expect(asFragment()).toMatchSnapshot()

    await delay(300)

    expect(mockedSetSearchString).toHaveBeenCalledTimes(2)
    expect(mockedSetSearchString).toHaveBeenCalledWith('Search string')
  })
})
