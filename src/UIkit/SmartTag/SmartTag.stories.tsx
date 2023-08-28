import type { Meta, StoryObj } from '@storybook/react'

import SmartTag, { SmartTagProps, SmartTagMode } from './SmartTag'

import '/src/index.css'

const meta: Meta<SmartTagProps> = {
  component: SmartTag,
  title: 'UIkit/Smart Tag',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - draggable smart tag',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    tagId: { description: 'SmartTag ID' },
    label: {
      description: 'SmartTag contents',
    },
    mode: {
      description: 'SmartTag appearance',
      defaultValue: SmartTagMode.MY_TAG,
    },
    loading: {
      description: 'Appearance of the SmartTag when loading content (skeleton)',
    },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<SmartTagProps>

export const Default: Story = {
  args: {
    tagId: 13,
    label: 'Smart Tag',
  },
}
