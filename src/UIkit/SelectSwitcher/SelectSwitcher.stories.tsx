import type { Meta, StoryObj } from '@storybook/react'

import SelectSwitcher, { SelectSwitcherProps } from './SelectSwitcher'

import '/src/index.css'

const meta: Meta<SelectSwitcherProps> = {
  component: SelectSwitcher,
  title: 'UIkit/Select Switcher',
  parameters: {
    docs: {
      description: {
        component: 'Stub for the SelectSwitcher component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
  },
}

export default meta

type Story = StoryObj<SelectSwitcherProps>

export const Default: Story = {}
