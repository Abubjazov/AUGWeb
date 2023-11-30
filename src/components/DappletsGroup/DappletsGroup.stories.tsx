import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import DappletsGroup, { DappletsGroupProps } from './DappletsGroup'

import '/src/index.css'

const meta: Meta<DappletsGroupProps> = {
  component: DappletsGroup,
  title: 'COMPONENTS/Dapplets Group',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Dapplets Group',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
  },
}

export default meta

type Story = StoryObj<DappletsGroupProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider>
        <div style={{ maxWidth: '1920px' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
