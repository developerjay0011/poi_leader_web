import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";

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
      const res = await Axios.post(APIRoutes.deleteStory, { body });
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