import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import SearchGroup, { SearchGroupProps } from './SearchGroup'

import '/src/index.css'

const meta: Meta<SearchGroupProps> = {
  component: SearchGroup,
  title: 'COMPONENTS/Search Group',
  parameters: {
    docs: {
      description: {
        component:
          'Interface component - Search Group. Contains such components as: SearchInput, SelectSwitcher',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
  },
}

export default meta

type Story = StoryObj<SearchGroupProps>

export const Default: Story = {
  args: {},
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
