import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { EMessageType } from 'store/slices/layoutSlice'

import Snackbar, { SnackbarProps } from './Snackbar'

import '/src/index.css'

const meta: Meta<SnackbarProps> = {
  component: Snackbar,
  title: 'UIkit/Snackbar',
  parameters: {
    docs: {
      description: {
        component:
          'Interface component - Snackbar. Component for visualizing service message or error.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    showMode: {
      description:
        'Activate show mode for StoryBook (deactivates self-destruction of message from the message queue)',
    },
    message: {
      description: 'Message/Error data object (IMessage)',
    },
  },
}

export default meta

type Story = StoryObj<SnackbarProps>

export const Default: Story = {
  args: {
    showMode: true,
    message: {
      messageId: '31',
      messageText: 'INFO Message text',
      messageType: EMessageType.INFO,
    },
  },
  decorators: [
    Story => (
      <MockedProvider>
        <div
          style={{
            maxWidth: '300px',
          }}
        >
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
