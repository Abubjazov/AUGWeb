import type { Meta, StoryObj } from '@storybook/react'

import WorkingOn, { WorkingOnProps } from './WorkingOn'

import '/src/index.css'

const meta: Meta<WorkingOnProps> = {
  component: WorkingOn,
  title: 'UIkit/Working On',
  parameters: {
    docs: {
      description: {
        component: 'Stub for the WorkingOn component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    dsOpened: { description: 'Hiding the list' },
  },
}

export default meta

type Story = StoryObj<WorkingOnProps>

export const Default: Story = {
  args: {
    dsOpened: true,
  },
}
