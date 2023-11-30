import type { Meta, StoryObj } from '@storybook/react'

import NotAvailable, { NotAvailableProps } from './NotAvailable'

import '/src/index.css'

const meta: Meta<NotAvailableProps> = {
  component: NotAvailable,
  title: 'UIkit/Not Available',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - NotAvailable',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Title text',
    },
  },
}

export default meta

type Story = StoryObj<NotAvailableProps>

export const Default: Story = {
  args: { text: 'Title text' },
  decorators: [Story => <Story />],
}
