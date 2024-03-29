import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import Page404, { Page404Props } from './Page404'

import '/src/index.css'

const meta: Meta<Page404Props> = {
  component: Page404,
  title: 'PAGES/Page 404',
  parameters: {
    docs: {
      description: {
        component:
          'Page component - Page404. Used to handle 404 "Page Not Found" error',
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

type Story = StoryObj<Page404Props>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
