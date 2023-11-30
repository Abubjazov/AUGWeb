import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import Header, { HeaderProps } from './Header'

import '/src/index.css'

const meta: Meta<HeaderProps> = {
  component: Header,
  title: 'COMPONENTS/Header',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Header',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    windowInnerWidth: {
      description:
        'Window Inner Width. Points of manifestation of effects: 1300px, 880px',
    },
  },
}

export default meta

type Story = StoryObj<HeaderProps>

export const Default: Story = {
  args: { windowInnerWidth: 1920 },
  decorators: [
    Story => (
      <MockedProvider>
        {/* <div style={{ width: '300px' }}> */}
        <Story />
        {/* </div> */}
      </MockedProvider>
    ),
  ],
}
