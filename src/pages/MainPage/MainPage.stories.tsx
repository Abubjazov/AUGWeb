import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import MainPage, { MainPageProps } from './MainPage'

import '/src/index.css'

const meta: Meta<MainPageProps> = {
  component: MainPage,
  title: 'PAGES/Main Page',
  parameters: {
    docs: {
      description: {
        component:
          'Page component - MainPage. Contains such components as: SearchGroup, DappletsGroup',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    NoProps: {
      description: 'There are no props for this component',
    },
  },
}

export default meta

type Story = StoryObj<MainPageProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider>
        <div style={{ maxWidth: '1300px', display: 'block', margin: '0 auto' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
