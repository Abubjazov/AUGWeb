import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import Layout, { LayoutProps } from './Layout'

import '/src/index.css'

const meta: Meta<LayoutProps> = {
  component: Layout,
  title: 'PAGES/Layout',
  parameters: {
    docs: {
      description: {
        component: 'Main interface component - Layout',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The necessary Page component is passed as children',
    },
  },
}

export default meta

type Story = StoryObj<LayoutProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <Provider>
        {/* <div style={{ maxWidth: '1920px' }}> */}
        <Story />
        {/* </div> */}
      </Provider>
    ),
  ],
}
