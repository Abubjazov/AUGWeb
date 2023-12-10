import type { Meta, StoryObj } from '@storybook/react'
import { EInstallButtonMode } from 'uikit/InstallButton/InstallButton'

import SvgIcon, { SvgIconProps } from './SvgIcon'

import '/src/index.css'

const meta: Meta<SvgIconProps> = {
  component: SvgIcon,
  title: 'UIkit/Svg Icon',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - svg icon',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    icon: { description: 'Icon name' },
  },
}

export default meta

type Story = StoryObj<SvgIconProps>

export const Default: Story = {
  args: {
    icon: EInstallButtonMode.INSTALL,
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          backgroundColor: 'lightgray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
