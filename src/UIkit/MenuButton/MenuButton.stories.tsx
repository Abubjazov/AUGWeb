import type { Meta, StoryObj } from '@storybook/react'

import '/src/index.css'

import MenuButton, {
  MenuButtonProps,
  MenuButtonMode,
  MenuButtonIcon,
} from './MenuButton'

const meta: Meta<MenuButtonProps> = {
  component: MenuButton,
  title: 'UIkit/Menu Button',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - menu button',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    menuOpened: {
      description: 'Hiding the button contents text',
      defaultValue: true,
    },
    icon: {
      description: 'Button icon',
      defaultValue: MenuButtonIcon.EDITOR_CHOICE,
    },
    text: {
      description: 'Button contents',
    },

    mode: {
      description: 'Button appearance',
      defaultValue: MenuButtonMode.INACTIVE,
    },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<MenuButtonProps>

export const Default: Story = {
  args: {
    icon: MenuButtonIcon.EDITOR_CHOICE,
    text: 'Editor’s Choice',
    menuOpened: true,
  },
}
