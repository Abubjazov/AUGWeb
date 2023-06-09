import type { Meta, StoryObj } from '@storybook/react'

import Button, { ButtonProps } from './Button'

const meta: Meta<ButtonProps> = {
  component: Button,
  title: 'Button',
  parameters: {
    docs: {
      description: {
        component: 'Primary UI component for user interaction',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Button contents',
    },
    primary: {
      description: 'Is this the principal call to action on the page?',
    },
    size: {
      description: 'How large should the button be?',
      defaultValue: 'medium',
    },
    backgroundColor: {
      description: 'What background color to use?',
    },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<ButtonProps>

export const BaseButton: Story = {
  args: {
    label: 'Default Button',
  },
}
