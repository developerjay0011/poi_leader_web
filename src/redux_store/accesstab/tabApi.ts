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

export const tabfilter = (accesstabs: [], usertype: string, tabs_routes: []) => {
  var tabs = [...tabs_routes]
  if (usertype === "leader") {
    tabs = tabs.filter((item: any) => ((item?.tabname == "Leader" || accesstabs?.some((element2: any) => element2?.tabname === item?.tabname)) && item?.isuser != "Employee"))
  } else {
    tabs = tabs.filter((item: any) => ((item?.tabname != "Leader" && accesstabs?.some((element2: any) => element2?.tabname === item?.tabname))))
  }
  return accesstabs?.length > 0 || usertype === "leader" ? tabs : []
}
