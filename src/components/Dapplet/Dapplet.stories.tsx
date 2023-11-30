import type { Meta, StoryObj } from '@storybook/react'
import {
  mockCommunityTags,
  mockDapplets,
  mockUserTags,
} from 'mockData/mockData'
import MockedProvider from 'mockData/mockedReduxProvider'

import Dapplet, { DappletProps } from './Dapplet'

import '/src/index.css'

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
    dappletUserTags: { description: 'User tags for this dapplet' },
    dappletCommunityTags: { description: 'Community tags for this dapplet' },
    dragOver: {
      description: 'Optional drag-over handler',
    },
  },
}

export default meta

type Story = StoryObj<DappletProps>

export const Default: Story = {
  args: {
    dapplet: mockDapplets[0],
    dappletUserTags: mockUserTags.slice(0, 3),
    dappletCommunityTags: mockCommunityTags.slice(0, 2),
  },
  decorators: [
    Story => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
}
