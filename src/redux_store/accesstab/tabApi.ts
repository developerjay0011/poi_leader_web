import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const fetchAccessTabs = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAccessTabs, { userId }));
      return res.data;
    }
  );
};

export const fetchEmployeeAccessTabs = async (employeeid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetLeaderEmployeeTabAccess, { employeeid }));
      return Array.isArray(res.data?.accesses) ? res.data?.accesses?.filter((item: any) => item?.ischecked == true)?.map((item: any) => ({ id: item?.tabid, tabname: item?.tabname })) : []
    }
  );
};
