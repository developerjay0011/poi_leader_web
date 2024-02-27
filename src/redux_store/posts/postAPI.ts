import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";


import { ConnectToAPI, GenerateId } from '@/utils/utility'
import { AppDispatch, getReduxStoreValues } from '..'
import { NewPostData } from '@/utils/typesUtils'
import { postActions } from './postSlice'
import moment from "moment";

const POST_ENDPOINT = 'leaderpost'


export const GetPostsForLeader = async (leaderid: string) => {
  return tryCatch(async () => {
    const res = await Axios.get(insertVariables(APIRoutes.GetPostsForLeader, { leaderid }));
    var data = Array.isArray(res.data) ? res.data : [];
    return ConvertCommonpost(data as any);
  });
};


export const LikePost = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikePost, likeBody);
    return res.data;
  });
};

export const UnlikePostorStory = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnlikePostorStory, UnlikeBody);
    return res.data;
  });
};

export const CommentPost = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.CommentPost, resBody);
    return res.data;
  });
};

const ConvertCommonpost = (list = []): any => {
  var combinedData = [] as any;
  list?.forEach((userData: any) => {
    var userdetails = { ...userData, developments: [], post: [], agendas: [], polls: [], }
    userData.posts.forEach((post: any) => {
      combinedData.push({
        post,
        type: "post",
        userdetails: userdetails,
      });
    });
    userData.agendas.forEach((post: any) => {
      combinedData.push({
        post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD hh:mm:ss") },
        type: "agendas",
        userdetails: userdetails,
      });
    });
    userData.polls.forEach((post: any) => {
      combinedData.push({
        type: "polls",
        post: { ...post, createddate: moment(post?.publish_date).format("YYYY-MM-DD hh:mm:ss") },
        userdetails: userdetails,
      });
    });
    userData.developments.forEach((post: any) => {
      combinedData.push({
        type: "developments",
        post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD hh:mm:ss") },
        userdetails: userdetails,
      });
    });
  });
  combinedData.sort((a: any, b: any) => {
    const dateA = new Date(a.post.createddate);
    const dateB = new Date(b.post.createddate);
    return dateB.getTime() - dateA.getTime();
  });
  return Array.isArray(combinedData) && combinedData;
};


export const VoteAdd = async (VoteAddBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.VoteAdd, VoteAddBody);
    return res.data;
  });
};

export const LikeComment = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikeComment, likeBody);
    return res.data;
  });
};

export const UnLikeComment = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnLikeComment, UnlikeBody);
    return res.data;
  });
};

export const ReplyToComment = async (comment: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.ReplyToComment, comment);
    return res.data;
  });
};





export const getLeaderAddedStories = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getLeaderAddedStories, { leaderId }));
      return res.data;
    }
  );
};

export const getStoriesForLeader = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getStoriesForLeader, { leaderId }));
      return res.data;
    }
  );
};

export const addStories = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.addStories, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}

export const deleteStory = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteStory, body);
      return res.data;
    }
  );
};

export const addPost = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.addPost, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}



//  Will remove 
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

export const updateComment = () => async (dispatch: AppDispatch) => { }

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
  };

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