import Axios from "@/config/axios";

export const fetchGetLeaderAddedPosts = async (leaderid: any) => {
  try {
    const res = await Axios.get(`/api/Post/GetLeaderAddedPosts/${leaderid}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeletePost = async (postBody: any) => {
  try {
    const res = await Axios.post(`/api/Post/DeletePost`,
      {
        body: JSON.stringify(postBody),
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchLikePost = async (likeBody: any) => {
  try {
    const res = await Axios.post(`/api/Post/LikePost`,
      {
        body: JSON.stringify(likeBody),
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUnlikePostorStory = async (UnlikeBody: any) => {
  try {
    const res = await Axios.post(`/api/Post/UnlikePostorStory`,
      {
        body: JSON.stringify(UnlikeBody),
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCommentPost = async (commentBody: any) => {
  try {
    const res = await Axios.post(`/api/Post/CommentPost`,
      {
        body: JSON.stringify(commentBody),
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};


export const fetchReplyToComment = async (commentBody: any) => {
  try {
    const res = await Axios.post(`/api/Post/ReplyToComment`,
      {
        body: JSON.stringify(commentBody),
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};