import type { Meta, StoryObj } from '@storybook/react'

import BaseButton, { BaseButtonProps, EBaseButtonMode } from './BaseButton'

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
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    loading: {
      description: 'Appearance of the button when loading content (spinner)',
    },
    disabled: {
      description: 'Button is not active',
    },
    mode: {
      description: 'Button appearance',
      defaultValue: EBaseButtonMode.OUTLINED_WHITE,
    },
    label: {
      description: 'Button contents',
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
    mode: EBaseButtonMode.CONTAINED_BLUE,
  },
}
