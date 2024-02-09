import axios from "axios";

export const fetchAddStory = async (formData: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/AddStory`,
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

export const fetchGetLeaderAddedStories = async (
  leaderid: string,
  token: string
) => {
  try {
    const respomse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/GetLeaderAddedStories/${leaderid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return respomse.data;
  } catch (error) {
    throw error; // You can throw or handle the error as
  }
};

export const fetchDeleteStory = async (postBody: any, token: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Post/DeleteStory`,
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
  