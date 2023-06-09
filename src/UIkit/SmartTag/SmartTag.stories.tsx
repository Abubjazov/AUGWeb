import type { Meta, StoryObj } from '@storybook/react'

import SmartTag, { SmartTagProps, SmartTagMode } from './SmartTag'

import '/src/index.css'

const meta: Meta<SmartTagProps> = {
  component: SmartTag,
  title: 'UIkit/Smart Tag',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - smart tag',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
    label: 'Smart Tag',
  },
}
