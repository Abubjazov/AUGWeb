import type { Meta, StoryObj } from '@storybook/react'
import { mockCommunityTags, mockUserTags } from 'mockData/mockData'
import MockedProvider from 'mockData/mockedReduxProvider'

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
    dappletUserTags: { description: 'User tags for this dapplet' },
    dappletCommunityTags: { description: 'Community tags for this dapplet' },
    dappletState: {
      description:
        'Dapplet state: open/close, used to show or hide the "add-tag-button" (only for Window Inner Width <= 880 )',
    },
    dappletOperationGoing: {
      description:
        'An array containing all operations with all dapplets currently occurring',
    },
  },
}

export default meta

type Story = StoryObj<DappletTagsProps>

export const Default: Story = {
  args: {
    dappletId: 'ECNk2nNngwGXouvMpjWt',
    dappletUserTags: mockUserTags.slice(0, 3),
    dappletCommunityTags: mockCommunityTags.slice(0, 2),
  },

  decorators: [
    Story => (
      <MockedProvider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
