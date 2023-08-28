import type { Meta, StoryObj } from '@storybook/react'

import DappletTextBlock, { DappletTextBlockProps } from './DappletTextBlock'

import '/src/index.css'

const meta: Meta<DappletTextBlockProps> = {
  component: DappletTextBlock,
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'UIkit/Dapplet Text Block',
  parameters: {
    docs: {
      description: {
        component: 'Standard interface component - basic dapplet text group',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userStyles: {
      description: 'Passing additional custom styles for root element',
    },
    title: { description: 'Text group title' },
    text: { description: 'Text group text' },
  },
}

export default meta

type Story = StoryObj<DappletTextBlockProps>

export const Default: Story = {
  args: {
    title: 'Title',
    text: 'Semper neque leo scelerisque gravida pharetra, elit viverra varius. Leo et pretium massa tristique mauris habitasse in in. Et cras sociis tellus viverra at dictumst quisque praesent arcu. Eu faucibus id at odio praesent. Ut nibh porta ipsum in eget id netus pharetra in. Ultrices scelerisque augue dui eget lacus, aenean cursus in. Consequat rhoncus egestas ultricies imperdiet diam. Imperdiet mollis egestas est faucibus sit tristique eu.',
  },
}
