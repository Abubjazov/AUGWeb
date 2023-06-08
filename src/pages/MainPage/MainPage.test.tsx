import { render, screen } from '@testing-library/react'

import MainPage from '.'

describe('MainPage', () => {
  test('should render MainPage', () => {
    render(<MainPage title="hello" />)

    expect(screen.getByText('hello')).toBeDefined()
  })
})
