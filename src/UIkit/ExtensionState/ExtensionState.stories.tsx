import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import ExtensionState, { ExtensionStateProps } from './ExtensionState'

import '/src/index.css'

const meta: Meta<ExtensionStateProps> = {
  component: ExtensionState,
  title: 'UIkit/Extension State',
  parameters: {
    docs: {
      description: {
        component: 'Stub for the ExtensionState component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<ExtensionStateProps>

export const Default: Story = {
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
}
