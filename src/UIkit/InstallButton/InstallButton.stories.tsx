import type { Meta, StoryObj } from '@storybook/react'

import '/src/index.css'

import InstallButton, {
  InstallButtonProps,
  InstallButtonMode,
} from './InstallButton'

const meta: Meta<InstallButtonProps> = {
  component: InstallButton,
  title: 'UIkit/Install Button',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - install button',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: 'Button appearance',
      defaultValue: InstallButtonMode.INSTALL,
    },
    mobile: {
      description: 'Button appearance for mobile version (icon button)',
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

type Story = StoryObj<InstallButtonProps>

export const Default: Story = {}
