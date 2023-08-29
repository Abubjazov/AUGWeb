/* eslint-disable import/order */
import type { Meta, StoryObj } from '@storybook/react'

import {
  defaultMockState,
  mockCommunityTags,
  mockDapplets,
  mockMyDapplets,
  mockMyTags,
} from 'mockData/mockData'
import Dapplet, { DappletProps } from './Dapplet'

import '/src/index.css'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import dappletsReducer from '../../store/slices/dappletsSlice'
import layoutReducer from '../../store/slices/layoutSlice'
import myDappletsReducer from '../../store/slices/myDappletsSlice'

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    dapplets: dappletsReducer,
    myDapplets: myDappletsReducer,
  },
  preloadedState: {
    ...defaultMockState,
    myDapplets: {
      myDapplets: [...mockMyDapplets],
      myTags: [...mockMyTags],
    },
    dapplets: {
      dapplets: [...mockDapplets],
      tags: [...mockCommunityTags],
    },
  },
})

const meta: Meta<DappletProps> = {
  component: Dapplet,
  title: 'COMPONENTS/Dapplet',
  parameters: {
    docs: {
      description: {
        component: 'Interface component - Dapplet',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // label: {
    //   description: 'Button contents',
    // },
    // mode: {
    //   description: 'Button appearance',
    //   defaultValue: 'outlined',
    // },
    // disabled: {
    //   description: 'Button is not active',
    // },
    // loading: {
    //   description: 'Appearance of the button when loading content (skeleton)',
    // },
    // onClick: {
    //   description: 'Optional click handler',
    // },
  },
}

export default meta

type Story = StoryObj<DappletProps>

export const Default: Story = {
  args: {
    dapplet: mockDapplets[0],
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}
