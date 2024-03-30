import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

// Get Agenda API
export const GetOfficeLocations = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetOfficeLocations, { leaderId }));
      return res.data;
    }
  );
};

export const SaveOfficeLocation = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveOfficeLocation, body);
      return res.data;
    }
  );
};

// Convert Agenda to Post API
export const DeleteOfficeLocation = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.DeleteOfficeLocation, body);
      return res.data;
    }
  );
};