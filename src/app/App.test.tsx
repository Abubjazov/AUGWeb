import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('should render App default', () => {
    expect(render(<App />)).toMatchSnapshot()
  })
})
