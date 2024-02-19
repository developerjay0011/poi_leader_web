import Axios from "@/config/axios";

export const fetchAddStory = async (formData: any) => {
  try {
    const response = await Axios.post(
      `/api/Post/AddStory`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // You can throw or handle the error as per your requirement
  }
};

export const fetchGetLeaderAddedStories = async (
  leaderid: string
) => {
  try {
    const response = await Axios.get(`/api/post/getLeaderAddedStories/${leaderid}`);
    return response.data;
  } catch (error) {
    throw error; // You can throw or handle the error as
  }
};

export const fetchDeleteStory = async (postBody: any) => {
    try {
      const res = await Axios.post('/api/Post/DeleteStory', { body: JSON.stringify(postBody) });
      return res.data;
    } catch (error) {
      return error;
    }
  };
  