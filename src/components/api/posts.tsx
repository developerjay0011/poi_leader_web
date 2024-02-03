export const fetchAddPost = async (postBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/AddPost`,
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
