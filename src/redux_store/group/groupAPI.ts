import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const getGroups = async (leaderId: string) => {
  return tryCatch(
    
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getGroups, { leaderId }));
      return res.data;
    }
  );
};

export const getSingleGroup = async (body: any) => {
  return tryCatch(

    async () => {
      const res = await Axios.post(APIRoutes.getSingleGroup,body);
      return res.data;
    }
  );
};



export const saveGroup = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.saveGroup, body);
      return res.data;
    }
  );
};

export const deleteGallery = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteGallery, body);
      return res.data;
    }
  );
};

