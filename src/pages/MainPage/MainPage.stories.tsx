import type { Meta, StoryObj } from '@storybook/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import MainPage, { MainPageProps } from './MainPage'

import '/src/index.css'

const meta: Meta<MainPageProps> = {
  component: MainPage,
  title: 'PAGES/MainPage',
  parameters: {
    docs: {
      description: {
        component:
          'Page component - MainPage. Contains such components as: SearchGroup, DappletsGroup',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<MainPageProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <Provider>
        <div style={{ maxWidth: '1300px', display: 'block', margin: '0 auto' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}
