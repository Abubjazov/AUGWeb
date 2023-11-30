import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import AddUserTagModalContent, {
  AddUserTagModalContentProps,
} from './AddUserTagModalContent'

import '/src/index.css'

const meta: Meta<AddUserTagModalContentProps> = {
  component: AddUserTagModalContent,
  title: 'COMPONENTS/Add User Tag Modal Content',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - AddUserTagModalContent',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dappletId: {
      description: 'Current dapplet ID',
    },
  },
}

export default meta

type Story = StoryObj<AddUserTagModalContentProps>

export const Default: Story = {
  args: {
    dappletId: 'ECNk2nNngwGXouvMpjWt',
  },

  decorators: [
    Story => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
}
