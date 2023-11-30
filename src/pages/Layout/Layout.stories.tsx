import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { BrowserRouter } from 'react-router-dom'

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
      <MockedProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </MockedProvider>
    ),
  ],
}
