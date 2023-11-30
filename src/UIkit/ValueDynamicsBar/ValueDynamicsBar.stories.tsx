import type { Meta, StoryObj } from '@storybook/react'

import ValueDynamicsBar, { ValueDynamicsBarProps } from './ValueDynamicsBar'

import '/src/index.css'

const meta: Meta<ValueDynamicsBarProps> = {
  component: ValueDynamicsBar,
  title: 'UIkit/ValueDynamicsBar',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - ValueDynamicsBar',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    title: {
      description: 'Optional title text',
    },
    value: {
      description: 'Display value',
    },
  },
}

export default meta

type Story = StoryObj<ValueDynamicsBarProps>

export const Default: Story = {
  args: { title: 'Title text', value: '-13' },
  decorators: [Story => <Story />],
}
