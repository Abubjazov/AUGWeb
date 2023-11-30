import { configureStore } from '@reduxjs/toolkit'
import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider, { defaultMState } from 'mockData/mockedReduxProvider'
import { AppStore } from 'store/index'
import layoutReducer, { EMessageType } from 'store/slices/layoutSlice'

import MessageArea, { MessageAreaProps } from './MessageArea'

import '/src/index.css'

const meta: Meta<MessageAreaProps> = {
  component: MessageArea,
  title: 'COMPONENTS/Message Area',
  parameters: {
    docs: {
      description: {
        component:
          'Interface component - MessageArea. Component for visualizing service messages and errors. Contains such components as: Snackbar',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showMode: {
      description:
        'Activate show mode for StoryBook (deactivates self-destruction of messages from the message queue)',
    },
  },
}

export default meta

type Story = StoryObj<MessageAreaProps>

const mockedStore: AppStore = configureStore({
  reducer: {
    layout: layoutReducer,
  },
  preloadedState: {
    layout: {
      ...defaultMState.layout,
      messages: [
        {
          messageId: '13',
          messageText: 'ERROR Message text',
          messageType: EMessageType.ERROR,
        },

        {
          messageId: '31',
          messageText: 'INFO Message text',
          messageType: EMessageType.INFO,
        },
      ],
    },
  },
})

export const Default: Story = {
  args: {
    showMode: true,
  },
  decorators: [
    Story => (
      <MockedProvider mockedStore={mockedStore}>
        <div
          style={{
            height: '100px',
          }}
        >
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
