import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { DirectoryDetails } from './directorySlice';

// Get Directory API
export const getDirectory = async (leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getDirectory, { leaderid }));
      return res.data;
    }
  );
};

// Delete Agenda API
export const deleteDirectory = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteDirectory, { id,leaderid });
      return res.data;
    }
  );
};

// Add Directory API
export const saveDirectory =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveDirectory, body);
        return res.data;
      }
    );
  }
