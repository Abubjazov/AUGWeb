import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SignInForm, { SignInFormProps } from './SignInForm'

import '/src/index.css'

const meta: Meta<SignInFormProps> = {
  component: SignInForm,
  title: 'COMPONENTS/Sign In Form',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - SignInForm',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userFunction: {
      description: 'Function for "Cancel" button inside form',
    },
    onSignIn: {
      description: 'User Login function for inside "submitHandler"',
    },
  },
}

export default meta

type Story = StoryObj<SignInFormProps>

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
