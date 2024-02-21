import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const getAgenda = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAgenda, { userId }));
      return res.data;
    }
  );
};


// export const registerUser =
//   async (body: RegisterData) => {
//     return tryCatch(
//       async () => {
//         const res = await Axios.post(APIRoutes.getCategories, body);
//         return res.data;
//       }
//     );
//   }