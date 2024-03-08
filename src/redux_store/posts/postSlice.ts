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
  allPosts: any,
  stories: any,
  mystories: any,
}

const init: PostState = {
  posts: [],
  allPosts: [],
  creatingPost: false,
  likingPost: false,
  stories: [],
  mystories: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState: init,
  reducers: {
    setPost(state, action: PayloadAction<PostDetails[]>) {
      state.allPosts = action.payload
    },
    listPosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = action.payload
    },
    storePosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = action.payload
    },
    addPost(state, action: PayloadAction<PostDetails>) {
      state.posts = [...state.posts, action.payload]
    },
    setCreatingPost(state, action: PayloadAction<boolean>) {
      state.creatingPost = action.payload
    },
    storeStories(state, action: PayloadAction<PostDetails[]>) {
      state.stories = action.payload
    },
    storeMyStories(state, action: PayloadAction<PostDetails[]>) {
      state.mystories = action.payload
    },
  },
})

export const postActions = postSlice.actions
