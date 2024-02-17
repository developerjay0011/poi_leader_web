import Axios from '@/config/axios'
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const getLeadersOptions = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.getLeadersForDropdown);
      return res.data;
    }
  );
};