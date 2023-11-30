import type { Meta, StoryObj } from '@storybook/react'

import BaseInput, { BaseInputProps } from './BaseInput'

import '/src/index.css'

const meta: Meta<BaseInputProps> = {
  component: BaseInput,
  title: 'UIkit/BaseInput',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - BaseInput',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dataTestId: {
      description: 'HTML-input tag attribute: "data-testid"',
    },
    type: {
      description: 'HTML-input tag attribute: "type"',
    },
    name: {
      description: 'HTML-input tag attribute: "name"',
    },
    placeholder: {
      description: 'HTML-input tag attribute: "placeholder"',
    },
    value: {
      description: 'Input value',
    },
    onChange: {
      description: 'OnChange event handler function',
    },
    onBlur: {
      description: 'onBlur event handler function',
    },
    errors: {
      description:
        'An array containing all input errors currently occurring (the last element of the array is displayed)',
    },
    errorWhite: {
      description: 'Change the error display color to white',
    },
    isDirty: {
      description: 'Whether the element was touched by the user',
    },
  },
}

export default meta

type Story = StoryObj<BaseInputProps>

export const Default: Story = {
  args: {
    placeholder: 'placeholder text',
    onChange: undefined,
    onBlur: undefined,
    errors: ['Some Error'],
    isDirty: true,
  },
  decorators: [Story => <Story />],
}
