import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import StandardModal, { StandardModalProps } from './StandardModal'

import '/src/index.css'

const meta: Meta<StandardModalProps> = {
  component: StandardModal,
  title: 'COMPONENTS/StandardModal',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - StandardModal',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    welcomeMode: {
      description: 'Optional mode special for Welcome page content',
    },
    modalContent: {
      description: 'Modal window content',
    },
  },
}

export default meta

type Story = StoryObj<StandardModalProps>

export const Default: Story = {
  args: {
    modalContent: (
      <div
        style={{
          height: '300px',
          width: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '31px',
            fontWeight: 900,
            lineHeight: '48px',
          }}
        >
          Modal window content
        </span>
      </div>
    ),
  },

  decorators: [
    Story => (
      <MockedProvider>
        <div
          style={{
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            borderRadius: 8,
          }}
        >
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
