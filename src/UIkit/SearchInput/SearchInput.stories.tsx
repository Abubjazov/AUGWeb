import type { Meta, StoryObj } from '@storybook/react'

import SearchInput, { SearchInputProps } from './SearchInput'

import '/src/index.css'

const meta: Meta<SearchInputProps> = {
  component: SearchInput,
  title: 'UIkit/Search Inpute',
  parameters: {
    docs: {
      description: {
        component: 'Stub for the SearchInput component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    placeholder: { description: 'Input placeholder' },
  },
}

export default meta

type Story = StoryObj<SearchInputProps>

export const Default: Story = {
  args: {
    placeholder: 'placeholder',
  },
}
