import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import Menu, { MenuProps } from './Menu'

import '/src/index.css'

const meta: Meta<MenuProps> = {
  component: Menu,
  title: 'COMPONENTS/Menu',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Menu',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    windowInner: {
      description: 'Boolean value to display arrow button element',
    },
  },
}

export default meta

type Story = StoryObj<MenuProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <Provider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}
