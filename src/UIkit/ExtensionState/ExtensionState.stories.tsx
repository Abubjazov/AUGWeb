import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

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
  argTypes: {
    NoProps: {
      description: 'There are no props for this component',
    },
  },
}

export default meta

type Story = StoryObj<ExtensionStateProps>

export const Default: Story = {
  decorators: [
    Story => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
}
