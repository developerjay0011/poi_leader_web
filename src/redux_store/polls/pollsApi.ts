import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { Shortanylistbytime } from '@/utils/CusLink';
import { RemoveOwnFcm, Sendnoti } from '../notification/notification';




export const getPolls = async (leaderId: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getPolls, { leaderId }));
      var setdata = Array.isArray(res.data) ? Shortanylistbytime(res?.data as any, "publish_date") : [] as any
      return setdata
    }
  );
};

// Add POll API
export const savePolls =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.savePolls, body);
        if (res?.data.success) {
          Sendnoti({
            tokens: RemoveOwnFcm(res?.data?.data?.tokens),
            description: res?.data?.data?.notification?.description,
            date: res?.data?.data?.notification?.createddate,
            title: res?.data?.data?.notification?.title,
            userimg: res?.data?.data?.notification?.userimg,
            referenceid: res?.data?.data?.notification?.referenceid,
            notificationid: res?.data?.data?.notification?.id,
            type: "poll"
          })
        }
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

