import type { Meta, StoryObj } from '@storybook/react'

import HeaderSettings, { HeaderSettingsProps } from './HeaderSettings'

import '/src/index.css'

const meta: Meta<HeaderSettingsProps> = {
  component: HeaderSettings,
  title: 'UIkit/Header Settings',
  parameters: {
    docs: {
      description: {
        component:
          'Standard interface component - icon button for open/close Dapplet Settings',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<HeaderSettingsProps>

export const Default: Story = {}
