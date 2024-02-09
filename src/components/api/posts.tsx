import axios from "axios";

/* export const fetchAddPost = async (formData: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/AddPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}; */

export const fetchAddPost = async (formData: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/AddPost`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // You can throw or handle the error as per your requirement
  }
};

export const fetchGetLeaderAddedPosts = async (leaderid: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/GetLeaderAddedPosts/${leaderid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchDeletePost = async (postBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/DeletePost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};


export const fetchLikePost = async (likeBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/LikePost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(likeBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUnlikePostorStory = async (UnlikeBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/UnlikePostorStory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(UnlikeBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCommentPost = async (commentBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/CommentPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(commentBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};