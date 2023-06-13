import type { Meta, StoryObj } from '@storybook/react'

import BaseButton, { BaseButtonProps } from './BaseButton'

import '/src/index.css'

const meta: Meta<BaseButtonProps> = {
  component: BaseButton,
  title: 'UIkit/Base Button',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - basic button',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Button contents',
    },
    mode: {
      description: 'Button appearance',
      defaultValue: 'outlined',
    },
    disabled: {
      description: 'Button is not active',
    },
    loading: {
      description: 'Appearance of the button when loading content (skeleton)',
    },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<BaseButtonProps>

export const Default: Story = {
  args: {
    label: 'Base Button',
  },
}
