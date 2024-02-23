import Axios from "@/config/axios";

export const fetchDeleteStory = async (postBody: any) => {
    try {
      const res = await Axios.post('/api/Post/DeleteStory', { body: JSON.stringify(postBody) });
      return res.data;
    } catch (error) {
      return error;
    }
  };
  