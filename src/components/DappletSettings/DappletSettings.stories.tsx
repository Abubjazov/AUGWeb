import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import DappletSettings, { DappletSettingsProps } from './DappletSettings'

import '/src/index.css'

const meta: Meta<DappletSettingsProps> = {
  component: DappletSettings,
  title: 'COMPONENTS/Dapplet Settings',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Dapplet Settings',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    windowInner: { description: 'Window Inner' },
  },
}

export default meta

type Story = StoryObj<DappletSettingsProps>

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
