import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// import { mockCommunityTags } from '../../mockData/mockData'
import type { RootState } from '../index'

export interface ITag {
  tagId: number
  tagName: string
}

type TTags = { tags: ITag[] }

const initialState: TTags = {
  // tags: mockCommunityTags,
  tags: [],
}

export const communityTagsSlice = createSlice({
  name: 'communityTags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags.push(action.payload)
    },
  },
})

export const { addTag } = communityTagsSlice.actions

export const selectCommunityTags = (state: RootState) =>
  state.communityTags.tags

export default communityTagsSlice.reducer
