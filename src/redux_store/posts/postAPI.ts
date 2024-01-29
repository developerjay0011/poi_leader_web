import { ConnectToAPI, GenerateId } from '@/utils/utility'
import { AppDispatch, getReduxStoreValues } from '..'
import { NewPostData } from '@/utils/typesUtils'
import { postActions } from './postSlice'
import CryptoJS from 'crypto-js'

const POST_ENDPOINT = 'leaderpost'

export const fetchAllPosts = () => async (dispatch: AppDispatch) => {
  try {
    const leaderId = getReduxStoreValues().UI.userDetails?.id as string

    const body = JSON.stringify({
      eventID: '0003',
      addInfo: {
        leaderId: '64be2c892d5345c3ca8b4bb1',
      },
    })

    const response = await ConnectToAPI(POST_ENDPOINT, body)

    dispatch(postActions.storePosts(response.postData))
  } catch (err: any) {
    console.error(err)
  }
}

type NewPost = (obj: NewPostData) => (dispatch: AppDispatch) => void

export const createNewPost: NewPost =
  (val) => async (dispatch: AppDispatch) => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      dispatch(postActions.setCreatingPost(true))
      const body = JSON.stringify({
        eventID: '0001',
        addInfo: {
          ...val,
          leaderId,
          comments: [],
          likes: [],
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)

      dispatch(fetchAllPosts())
      dispatch(postActions.setCreatingPost(false))
    } catch (err) {
      console.error(err)
      dispatch(postActions.setCreatingPost(false))
    }
  }

export const deletePost = (postId: string) => async (dispatch: AppDispatch) => {
  try {
    const leaderId = getReduxStoreValues().UI.userDetails?.id as string
    console.log(postId)
    const body = JSON.stringify({
      eventID: '0004',
      addInfo: {
        leaderId,
        postId,
      },
    })

    await ConnectToAPI(POST_ENDPOINT, body)

    dispatch(fetchAllPosts())
  } catch (err) {
    console.error(err)
  }
}

// POST Like
export const updateLike = (postId: string, userId: string) => async () => {
  try {
    const leaderId = getReduxStoreValues().UI.userDetails?.id as string
    const body = JSON.stringify({
      eventID: '0007',
      addInfo: {
        leaderId,
        postId,
        userId,
      },
    })

    await ConnectToAPI(POST_ENDPOINT, body)
  } catch (err) {
    console.error(err)
  }
}

// Post Comments
export const addNewComment: (obj: {
  postId: string
  userImg: string
  commentText: string
}) => (d: AppDispatch) => void =
  ({ commentText, postId, userImg }) =>
  async (dispatch: AppDispatch) => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      const body = JSON.stringify({
        eventID: '0005',
        addInfo: {
          leaderId,
          postId,
          userId: leaderId,
          userImg,
          commentText,
          id: GenerateId(),
          likes: [],
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)

      dispatch(fetchAllPosts())
    } catch (err) {
      console.error(err)
    }
  }

export const updateComment = () => async (dispatch: AppDispatch) => {}

export const deletePostComment =
  (postId: string, id: string) => async (dispatch: AppDispatch) => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      const body = JSON.stringify({
        eventID: '0006',
        addInfo: {
          leaderId,
          postId,
          id,
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)

      dispatch(fetchAllPosts())
    } catch (err) {
      console.error(err)
    }
  }

export const updateCommentLike =
  (postId: string, id: string, userId: string) => async () => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      const body = JSON.stringify({
        eventID: '0008',
        addInfo: {
          leaderId,
          postId,
          id,
          userId,
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)
    } catch (err) {
      console.error(err)
    }
  }

export const changeNestedLike: (obj: {
  postId: string
  id: string
  userId: string
  likeTypeStatus: '_media' | '_comments'
  eventID: '0008' | '0010'
}) => () => void =
  ({ id, postId, userId, likeTypeStatus, eventID }) =>
  async () => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      const body = JSON.stringify({
        eventID,
        addInfo: {
          leaderId,
          postId,
          id,
          userId,
          likeTypeStatus,
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)
    } catch (err) {
      console.error(err)
    }
  }

export const addNewNestedComment: (obj: {
  postId: string
  id: string // either media ID | parent comment id
  userId: string
  username: string
  userImg: string
  commentReplyText: string
  commentTypeStatus: '_comments' | '_media'
}) => (d: AppDispatch) => void =
  ({
    commentReplyText,
    id,
    postId,
    userId,
    userImg,
    username,
    commentTypeStatus,
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const leaderId = getReduxStoreValues().UI.userDetails?.id as string
      const body = JSON.stringify({
        eventID: '0009',
        addInfo: {
          leaderId,
          postId,
          id, // either media ID | parent comment id
          commentReplyId: GenerateId(),
          userId,
          username,
          userImg,
          commentReplyText,
          commentTypeStatus,
        },
      })

      await ConnectToAPI(POST_ENDPOINT, body)
      dispatch(fetchAllPosts())
    } catch (err) {
      console.error(err)
    }
  }
