import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import '/src/index.css'

import InstallButton, { InstallButtonProps } from './InstallButton'

const meta: Meta<InstallButtonProps> = {
  component: InstallButton,
  title: 'UIkit/Install Button',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - install button',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dappletId: { description: 'Dapplet ID' },
    mobile: {
      description: 'Button appearance for mobile version (icon button)',
    },
    disabled: {
      description: 'Button is not active',
    },
    loading: {
      description: 'Appearance of the button when loading content (skeleton)',
    },
  },
}

export default meta

type Story = StoryObj<InstallButtonProps>

export const Default: Story = {
  args: {
    dappletId: 13,
  },
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
}
