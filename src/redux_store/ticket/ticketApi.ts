import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { MapFcm, Sendnoti } from '../notification/notification';

// Add Letter API
export const getTickets = async (leaderid: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getTickets, { leaderid }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

export const saveTicketStatus =
  async (formData: any, ticket_category?: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveTicketStatus, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (res?.data?.success) {
          Sendnoti({
            tokens: MapFcm(res?.data?.data?.tokens, true),
            description: res?.data?.data?.notification?.description,
            date: res?.data?.data?.notification?.createddate,
            title: res?.data?.data?.notification?.title,
            userimg: res?.data?.data?.notification?.userimg,
            referenceid: res?.data?.data?.notification?.referenceid,
            notificationid: res?.data?.data?.notification?.id,
            type: ticket_category + "_status",
          })
        }
        return res.data;
      }
    );
  }


export const SaveTicketManually = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveTicketManually, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}


export const deleteTicketStatus = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteTicketStatus, { id, leaderid });
      return res.data;
    }
  );
};

export const GetCategories = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.GetCategories);
      return res.data;
    }
  );
};

