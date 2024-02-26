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



export const saveGallery = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.saveGallery, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
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

