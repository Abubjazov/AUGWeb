import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import Dapplet, { DappletProps } from './Dapplet'

import '/src/index.css'
// eslint-disable-next-line import/order
import { mockDapplets } from 'mockData/mockData'

const meta: Meta<DappletProps> = {
  component: Dapplet,
  title: 'COMPONENTS/Dapplet',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Dapplet',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    dapplet: { description: 'Dapplet data' },
  },
}

export default meta

type Story = StoryObj<DappletProps>

export const Default: Story = {
  args: {
    dapplet: mockDapplets[3],
  },
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
}
