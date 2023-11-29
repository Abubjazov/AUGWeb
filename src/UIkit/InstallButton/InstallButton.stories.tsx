import type { Meta, StoryObj } from '@storybook/react'
import { mockUserDapplets } from 'mockData/mockData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import '/src/index.css'

import InstallButton, {
  EInstallButtonMode,
  InstallButtonProps,
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
    loading: {
      description: 'Appearance of the button when loading content (spinner)',
    },
    disabled: {
      description: 'Button is not active',
    },
    mobile: {
      description: 'Button appearance for mobile version (icon button)',
    },
    setMode: {
      description: 'Button appearance (optional)',
    },
  },
}

export default meta

type Story = StoryObj<InstallButtonProps>

export const Default: Story = {
  args: {
    dappletId: mockUserDapplets[0].dappletId,
    setMode: EInstallButtonMode.INSTALL,
  },
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
}
