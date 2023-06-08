import { fireEvent, render, screen } from '@testing-library/react'

import MainPage from '.'

describe('MainPage', () => {
  beforeEach(() => {
    render(<MainPage title="hello" content="Main Page content" />)
  })

  test('should render MainPage', () => {
    expect(screen.getByText('hello')).toBeDefined()
  })

  test('should render MainPage with title', () => {
    expect(screen.queryAllByTestId('title')).length(1)
  })

  test('should render MainPage with content', () => {
    expect(screen.queryAllByText(/Main Page Content/i)).length(1)
    expect(screen.queryAllByText(/Main Page Second Content/i)).length(0)
  })

  test('should show & hide the Second Content', () => {
    expect(screen.queryAllByText(/Main Page Second Content/i)).length(0)
    expect(screen.queryAllByTestId('button')).length(1)
    expect(screen.queryByText(/Open second content/i)).toBeDefined()

    const button = screen.queryByTestId('button')

    button && fireEvent.click(button)

    expect(screen.queryAllByText(/Main Page Second Content/i)).length(1)
    expect(screen.queryByText(/Open second content/i)).toBeNull()
    expect(screen.queryByText(/Close second content/i)).toBeDefined()

    button && fireEvent.click(button)

    expect(screen.queryAllByText(/Main Page Second Content/i)).length(0)
    expect(screen.queryAllByText(/Open second content/i)).length(1)
    expect(screen.queryAllByText(/Close second content/i)).length(0)
  })
})

describe('MainPage without title and content', () => {
  beforeEach(() => {
    render(<MainPage />)
  })

  test('should render MainPage without title', () => {
    expect(screen.queryAllByTestId('title')).length(0)
  })

  test('should render MainPage without content', () => {
    expect(screen.queryByText(/Main Page Content/i)).toBeNull()
    expect(screen.queryAllByText(/Main Page Second Content/i)).length(0)
  })
})
