import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import MyLists, { MyListsProps } from './MyLists'

import '/src/index.css'

const meta: Meta<MyListsProps> = {
  component: MyLists,
  title: 'UIkit/My Lists',
  parameters: {
    docs: {
      description: {
        component: 'Stub for the MyLists component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    menuOpened: { description: 'Hiding the list' },
  },
}

export default meta

type Story = StoryObj<MyListsProps>

export const Default: Story = {
  args: {
    menuOpened: true,
  },
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
}
