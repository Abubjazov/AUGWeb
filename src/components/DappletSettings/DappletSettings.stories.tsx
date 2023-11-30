import { configureStore } from '@reduxjs/toolkit'
import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider, { defaultMState } from 'mockData/mockedReduxProvider'
import { AppStore, reducers } from 'store/index'

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

const mockedStore: AppStore = configureStore({
  reducer: reducers,
  preloadedState: {
    ...defaultMState,
    layout: {
      ...defaultMState.layout,
      dappletSettingsOpened: true,
    },
  },
})

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider mockedStore={mockedStore}>
        <div style={{ width: '330px' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
