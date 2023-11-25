import type { Meta, StoryObj } from '@storybook/react'
import { mockUserTags } from 'mockData/mockData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'

import TagsGroup, { TagsGroupProps } from './TagsGroup'

import '/src/index.css'

const meta: Meta<TagsGroupProps> = {
  component: TagsGroup,
  title: 'COMPONENTS/Tags Group',
  parameters: {
    docs: {
      description: {
        component:
          'Interface component - Tags Group. Contains such components as: SmartTag',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    title: {
      description: 'Tags group title text',
    },
    titleUppercase: {
      description: 'Convert tags group title text to Uppercase',
    },
    tagMode: {
      description: 'SmartTag mode',
    },
    menuOpened: {
      description: 'Hiding the tags group',
    },
    tags: {
      description: 'Array of tags to display',
    },
  },
}

export default meta

type Story = StoryObj<TagsGroupProps>

export const Default: Story = {
  args: {
    title: 'Title',
    titleUppercase: true,
    tagMode: ESmartTagMode.MY_TAG,
    menuOpened: true,
    tags: mockUserTags,
  },
  decorators: [
    Story => (
      <Provider>
        {/* <div style={{ width: '300px' }}> */}
        <Story />
        {/* </div> */}
      </Provider>
    ),
  ],
}
