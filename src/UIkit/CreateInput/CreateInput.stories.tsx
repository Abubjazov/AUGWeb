import type { Meta, StoryObj } from '@storybook/react'

import CreateInput, { CreateInputProps } from './CreateInput'

import '/src/index.css'

const meta: Meta<CreateInputProps> = {
  component: CreateInput,
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
    title: { description: 'Input group title' },
    placeholder: { description: 'Input placeholder' },
    menuOpened: { description: 'Hiding the input group' },
    loading: {
      description:
        'Appearance of the input group when loading content (spinner)',
    },
    inputValidators: {
      description: 'Optional validators list for input',
    },
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
    inputValidators: {
      isEmpty: { value: true, message: 'Input value required' },
      minLength: {
        value: 3,
        message: 'Minimum input value length 3',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: '290px' }}>
        <Story />
      </div>
    ),
  ],
}
