import type { Meta, StoryObj } from '@storybook/react'

import Button, { ButtonProps } from './Button'

const meta: Meta<ButtonProps> = {
  component: Button,
}

export default meta

type Story = StoryObj<ButtonProps>

export const DefaultButton: Story = {
  args: {
    label: 'Default Button',
  },
}
