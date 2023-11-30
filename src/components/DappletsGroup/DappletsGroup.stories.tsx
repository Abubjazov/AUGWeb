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
    NoProps: {
      description: 'There are no props for this component',
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
