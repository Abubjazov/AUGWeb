import type { Meta, StoryObj } from '@storybook/react'
// eslint-disable-next-line import/order
import { Provider } from 'react-redux'

import '/src/index.css'

import { store } from 'store/index'

import InstallButton, {
  InstallButtonProps,
  // InstallButtonMode,
} from './InstallButton'

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
    // mode: {
    //   description: 'Button appearance',
    //   defaultValue: InstallButtonMode.INSTALL,
    // },
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
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}
