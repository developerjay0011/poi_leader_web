import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'




export const getPolls = async (leaderId: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getPolls, { leaderId }));
      return res.data;
    }
  );
};

// Add POll API
export const savePolls =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.savePolls, body);
        return res.data;
      }
    );
  }
// Delete Poll API
export const deletePoll = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deletePoll, { id, leaderid });
      return res.data;
    }
  );
};

