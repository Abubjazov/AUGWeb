import { fireEvent, render, screen } from '@testing-library/react'

import WellcomePage from '.'

describe('WellcomePage', () => {
  beforeEach(() => {
    render(<WellcomePage title="hello" content="Wellcome Page content" />)
  })

  test('should render WellcomePage', () => {
    expect(screen.getByText('hello')).toBeDefined()
  })

  test('should render WellcomePage with title', () => {
    expect(screen.queryAllByTestId('title')).length(1)
  })

  test('should render WellcomePage with content', () => {
    expect(screen.queryAllByText(/Wellcome Page Content/i)).length(1)
    expect(screen.queryAllByText(/Wellcome Page Second Content/i)).length(0)
  })

  test('should show & hide the Second Content', () => {
    expect(screen.queryAllByText(/Wellcome Page Second Content/i)).length(0)
    expect(screen.queryAllByTestId('button')).length(1)
    expect(screen.queryByText(/Open second content/i)).toBeDefined()

    const button = screen.queryByTestId('button')

    button && fireEvent.click(button)

    expect(screen.queryAllByText(/Wellcome Page Second Content/i)).length(1)
    expect(screen.queryByText(/Open second content/i)).toBeNull()
    expect(screen.queryByText(/Close second content/i)).toBeDefined()

    button && fireEvent.click(button)

    expect(screen.queryAllByText(/Wellcome Page Second Content/i)).length(0)
    expect(screen.queryAllByText(/Open second content/i)).length(1)
    expect(screen.queryAllByText(/Close second content/i)).length(0)
  })
})

describe('WellcomePage without title and content', () => {
  beforeEach(() => {
    render(<WellcomePage />)
  })

  test('should render WellcomePage without title', () => {
    expect(screen.queryAllByTestId('title')).length(0)
  })

  test('should render WellcomePage without content', () => {
    expect(screen.queryByText(/Wellcome Page Content/i)).toBeNull()
    expect(screen.queryAllByText(/Wellcome Page Second Content/i)).length(0)
  })
})
