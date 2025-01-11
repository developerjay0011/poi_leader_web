import { PostDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  posts: PostDetails[]
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
  likingPost: false,
  stories: [],
  mystories: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState: init,
  reducers: {
    setPost(state, action: PayloadAction<PostDetails[] | any>) {
      state.allPosts = Array.isArray(action.payload) ? action.payload : []
    },
    listPosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = Array.isArray(action.payload) ? action.payload : []
    },
    storePosts(state, action: PayloadAction<PostDetails[]>) {
      state.posts = Array.isArray(action.payload) ? action.payload : []
    },
    addPost(state, action: PayloadAction<PostDetails>) {
      state.posts = Array.isArray(action.payload) ? [...state.posts, action.payload] : []
    },
    storeStories(state, action: PayloadAction<PostDetails[]>) {
      state.stories = Array.isArray(action.payload) ? action.payload : []
    },
    storeMyStories(state, action: PayloadAction<PostDetails[]>) {
      state.mystories = Array.isArray(action.payload) ? action.payload : []
    },
  },
})

export const postActions = postSlice.actions
