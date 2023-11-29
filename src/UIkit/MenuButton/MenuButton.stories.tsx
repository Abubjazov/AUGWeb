import type { Meta, StoryObj } from '@storybook/react'

import '/src/index.css'

import MenuButton, {
  MenuButtonProps,
  EMenuButtonIcon,
  EMenuButtonMode,
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
    text: {
      description: 'Button contents',
    },
    mode: {
      description: 'Button appearance',
      defaultValue: EMenuButtonMode.INACTIVE,
    },
    icon: {
      description: 'Button icon',
      defaultValue: EMenuButtonIcon.EDITOR_CHOICE,
    },
    onClick: {
      description: 'Optional click handler',
    },
    disabled: {
      description: 'Button is not active',
    },
  },
}

export default meta

type Story = StoryObj<MenuButtonProps>

export const Default: Story = {
  args: {
    icon: EMenuButtonIcon.EDITOR_CHOICE,
    text: 'Editor’s Choice',
    menuOpened: true,
  },
}
