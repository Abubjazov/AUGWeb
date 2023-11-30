import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import { BrowserRouter } from 'react-router-dom'

import WelcomePage, { WelcomePageProps } from './WelcomePage'

import '/src/index.css'

const meta: Meta<WelcomePageProps> = {
  component: WelcomePage,
  title: 'PAGES/Welcome Page',
  parameters: {
    docs: {
      description: {
        component:
          'Page component - WelcomePage. Contains such components as: StandardModal with WelcomeModalContent, MessageArea',
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

type Story = StoryObj<WelcomePageProps>

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
