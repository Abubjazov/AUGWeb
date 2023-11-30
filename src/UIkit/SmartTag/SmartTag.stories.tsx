import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SmartTag, { SmartTagProps, ESmartTagMode } from './SmartTag'

import '/src/index.css'

const meta: Meta<SmartTagProps> = {
  component: SmartTag,
  title: 'UIkit/Smart Tag',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - draggable smart tag',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    tagId: { description: 'SmartTag ID' },
    dappletId: { description: 'Dapplet ID' },
    loading: {
      description: 'Appearance of the SmartTag when loading content (skeleton)',
    },
    mode: {
      description: 'SmartTag appearance',
      defaultValue: ESmartTagMode.MY_TAG,
    },
    label: {
      description: 'SmartTag contents',
    },
    onClick: {
      description: 'Optional click handler',
    },
  },
}

export default meta

type Story = StoryObj<SmartTagProps>

export const Default: Story = {
  args: {
    tagId: '13',
    label: 'Smart Tag',
  },
  decorators: [
    Story => (
      <MockedProvider>
        <div style={{ width: '70px' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
