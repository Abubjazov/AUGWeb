import type { Meta, StoryObj } from '@storybook/react'

import CreateInput, { CreateInputProps } from './CreateInput'

import '/src/index.css'

const meta: Meta<CreateInputProps> = {
  component: CreateInput,
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'UIkit/Create Input',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - basic input group',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    menuOpened: { description: 'Hiding the input group' },
    title: { description: 'Input group title' },
    placeholder: { description: 'Input placeholder' },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<CreateInputProps>

export const Default: Story = {
  args: {
    menuOpened: true,
    title: 'Title',
    placeholder: 'placeholder',
  },
}
