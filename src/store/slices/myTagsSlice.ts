import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { mockMyTags } from 'utils/mockData'

import type { RootState } from '../index'

export interface ITag {
  tagId: number
  tagName: string
}

type TTags = { tags: ITag[] }

const initialState: TTags = {
  tags: mockMyTags,
}

export const myTagsSlice = createSlice({
  name: 'myTags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags.push(action.payload)
    },
  },
})

export const { addTag } = myTagsSlice.actions

export const selectCommunityTags = (state: RootState) => state.myTags.tags

export default myTagsSlice.reducer
