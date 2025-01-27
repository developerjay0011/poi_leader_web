import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { TAB_ACCESS } from '@/constants/common';
import { APIRoutes, EmployeeProtectedRoutes } from '@/constants/routes'
import { EXTRA_TABS, LEFT_NAV_ROUTES } from '@/utils/routes';
import { setCookie } from 'cookies-next';

export const fetchAccessTabs = async (userId: string, data?: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAccessTabs, { userId }));
      var tab_layout = tabfilter(res?.data, "leader", [...LEFT_NAV_ROUTES, ...EXTRA_TABS] as any)?.map((item: any) => item?.link || "")
      var notoroute = [...LEFT_NAV_ROUTES, ...EXTRA_TABS]?.filter((item: any) => (!tab_layout?.includes(item?.link)) && item?.link)?.map((item: any) => item?.link)
      await setCookie(TAB_ACCESS, notoroute);
      if (data?.nav) {
        await data?.router.push(EmployeeProtectedRoutes.employee);
        data?.setLoggingIn(false)
      }
      return { tab_data: res?.data, notoroute: notoroute }
    }
  );
};

export const fetchEmployeeAccessTabs = async (employeeid: string, data?: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetLeaderEmployeeTabAccess, { employeeid }));
      var tab_data = Array.isArray(res.data?.accesses) ? res.data?.accesses?.filter((item: any) => item?.ischecked == true)?.map((item: any) => ({ id: item?.tabid, tabname: item?.tabname })) : []
      var tab_layout = tabfilter(tab_data, "employee", [...LEFT_NAV_ROUTES, ...EXTRA_TABS] as any)?.map((item: any) => item?.link2 || '')
      var notoroute = [...LEFT_NAV_ROUTES, ...EXTRA_TABS]?.filter((item: any) => (!tab_layout?.includes(item?.link2)) && item?.link2)?.map((item: any) => item?.link2 || "")
      await setCookie(TAB_ACCESS, notoroute);
      if (data?.nav) {
        await data?.router.push(EmployeeProtectedRoutes.employee);
        data?.setLoggingIn(false)
      }
      return { tab_data: tab_data, notoroute: notoroute }
    }
  );
};

export const tabfilter = (accesstabs: any[], usertype: string, tabs_routes: any[]) => {
  var tabs = [...tabs_routes]
  if (usertype === "leader") {
    tabs = tabs.filter((item: any) => ((item?.link && item?.tabname == "Leader" || accesstabs?.some((element2: any) => element2?.tabname === item?.tabname)) && item?.isuser != "Employee"))
  } else {
    tabs = tabs.filter((item: any) => ((item?.link2 && item?.tabname != "Leader" && accesstabs?.some((element2: any) => element2?.tabname === item?.tabname))))
  }
  return (accesstabs?.length > 0 || usertype === "leader") && Array.isArray(tabs) ? tabs : []
}
