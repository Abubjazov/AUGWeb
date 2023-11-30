import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import Spinner, { SpinnerProps } from './Spinner'

import '/src/index.css'

const meta: Meta<SpinnerProps> = {
  component: Spinner,
  title: 'UIkit/Spinner',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - Spinner',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      description: 'Spinner height',
    },
    width: {
      description: 'Spinner width',
    },
    strokeWidth: {
      description: 'Spinner stroke width',
    },
    strokeColor: {
      description: 'Spinner stroke color',
    },
  },
}

export default meta

type Story = StoryObj<SpinnerProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
