import type { Meta, StoryObj } from '@storybook/react'
import MockedProvider from 'mockData/mockedReduxProvider'

import SelectSwitcher, { SelectSwitcherProps } from './SelectSwitcher'

import '/src/index.css'

const meta: Meta<SelectSwitcherProps> = {
  component: SelectSwitcher,
  title: 'COMPONENTS/SelectSwitcher',
  parameters: {
    docs: {
      description: {
        component:
          'Interface component - SelectSwitcher. Used to configure content sorting',
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

type Story = StoryObj<SelectSwitcherProps>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MockedProvider>
        <div style={{ height: '230px' }}>
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
}
