import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

// Get Agenda API
export const GetFiles = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetFiles, { leaderId }));
      return res.data;
    }
  );
};

export const DeleteFile = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.DeleteFile, body);
      return res.data;
    }
  );
};

// Convert Agenda to Post API
export const SaveFile = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveFile, body);
      return res.data;
    }
  );
};