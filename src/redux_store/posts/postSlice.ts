import { PostDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  posts: PostDetails[]
  creatingPost: boolean
  likingPost: boolean
}

const init: PostState = {
  posts: [],
  creatingPost: false,
  likingPost: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState: init,
  reducers: {
    storePosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = action.payload
    },
    setCreatingPost(state, action: PayloadAction<boolean>) {
      state.creatingPost = action.payload
    },
  },
})

export const postActions = postSlice.actions
