import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { BrowserRouter } from 'react-router-dom'

import SocialPage, { SocialPageProps } from './SocialPage'

import '/src/index.css'

const meta: Meta<SocialPageProps> = {
  component: SocialPage,
  title: 'PAGES/Social Page',
  parameters: {
    docs: {
      description: {
        component: 'Page component - SocialPage.',
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

type Story = StoryObj<SocialPageProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </MockedProvider>
    ),
  ],
}
