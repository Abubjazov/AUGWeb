import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import WelcomeModalContent, {
  WelcomeModalContentProps,
} from './WelcomeModalContent'

import '/src/index.css'

const meta: Meta<WelcomeModalContentProps> = {
  component: WelcomeModalContent,
  title: 'COMPONENTS/WelcomeModalContent',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - WelcomeModalContent',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    NoProps: {
      description: 'There are no props for this component',
    },
  },
}

export default meta

type Story = StoryObj<WelcomeModalContentProps>

export const Default: Story = {
  args: {},

  decorators: [
    Story => (
      <MockedProvider>
        <div
          style={{
            maxWidth: '300px',
            background: '#999999',
            padding: 30,
            borderRadius: 8,
          }}
        >
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
