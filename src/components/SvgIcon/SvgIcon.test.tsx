import { render } from '@testing-library/react'
import { ButtonMode } from 'components/InstallButton/InstallButton'
import { describe, expect, test } from 'vitest'

import SvgIcon from '.'

describe('SvgIcon', () => {
  test('should return NULL', () => {
    expect(render(<SvgIcon icon={ButtonMode.UNEXPECTED} />)).toMatchSnapshot()
  })
})
