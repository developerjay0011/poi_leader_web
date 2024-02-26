import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
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


// Close Account API
export const closeAccount = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.closeAccount, { userId }));
      return res.data;
    }
  );
};

// Deactivate Account API
export const deActiveAccount = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.deActiveAccount, { userId }));
      return res.data;
    }
  );
};