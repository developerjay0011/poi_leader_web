import { PostDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  posts: PostDetails[]
  creatingPost: boolean
  likingPost: boolean
  leaderid?: string
  name?: string
  image?: string
  political_party?: string
  designation?: string
  agendas?: any
  developments?: any
  polls?: any
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
    listPosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = action.payload
    },
    storePosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = action.payload
    },
    addPost(state, action: PayloadAction<PostDetails>) {
      state.posts = [ ...state.posts, action.payload ]
    },
    setCreatingPost(state, action: PayloadAction<boolean>) {
      state.creatingPost = action.payload
    },
  },
})

export const postActions = postSlice.actions
