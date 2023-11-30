import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import Fallback, { FallbackProps } from './Fallback'

import '/src/index.css'

const meta: Meta<FallbackProps> = {
  component: Fallback,
  title: 'UIkit/Fallback',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - Fallback',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      description: 'Fallback height',
    },
    width: {
      description: 'Fallback width',
    },
  },
}

export default meta

type Story = StoryObj<FallbackProps>

export const Default: Story = {
  args: { height: 30, width: 50 },
  decorators: [
    Story => (
      <MockedProvider>
        <div
          style={{
            // height: '100%',
            // width: '100%',
            // background: '#999999',
            justifyContent: 'center',
            alignItems: 'center',
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
