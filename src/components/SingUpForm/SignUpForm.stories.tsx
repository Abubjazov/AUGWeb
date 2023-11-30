import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SignUpForm, { SignUpFormProps } from './SignUpForm'

import '/src/index.css'

const meta: Meta<SignUpFormProps> = {
  component: SignUpForm,
  title: 'COMPONENTS/Sign Up Form',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - SignUpForm',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userFunction: {
      description: 'Function for "Cancel" button inside form',
    },
    onSignUp: {
      description: 'User registration function for inside "submitHandler"',
    },
  },
}

export default meta

type Story = StoryObj<SignUpFormProps>

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
