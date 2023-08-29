import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import DappletTags, { DappletTagsProps } from './DappletTags'

import '/src/index.css'

const meta: Meta<DappletTagsProps> = {
  component: DappletTags,
  title: 'COMPONENTS/Dapplet Tags',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Dapplet Tags',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    dappletId: {
      description: 'Displayed dapplet ID',
    },
    dappletState: {
      description:
        'Dapplet state: open/close (only for Window Inner Width <= 880 )',
    },
  },
}

export default meta

type Story = StoryObj<DappletTagsProps>

export const Default: Story = {
  args: { dappletId: 1 },

  decorators: [
    Story => (
      <Provider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}
