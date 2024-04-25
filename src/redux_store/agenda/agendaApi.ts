import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { AgendaDetails, TimeLineFormField } from './agendaSlice';
import { Savedby } from '@/constants/common';
import { MapFcm, Sendnoti } from '../notification/notification';

// Get Agenda API
export const getAgenda = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAgenda, { userId }));
      return res.data;
    }
  );
};
// Get Category API
export const getCategory = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getCategories, { userId }));
      return res.data;
    }
  );
};
// Delete Agenda API
export const deleteAgenda = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteAgenda, { id, leaderid });
      return res.data;
    }
  );
};
// Convert Agenda to Post API
export const makeAgendaPost = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.makeAgendaPost, { id, leaderid });
      if (res?.data?.success) {
        Sendnoti({
          tokens: MapFcm(res?.data?.data?.tokens, true),
          description: res?.data?.data?.notification?.description,
          date: res?.data?.data?.notification?.createddate,
          title: res?.data?.data?.notification?.title,
          userimg: res?.data?.data?.notification?.userimg,
          referenceid: res?.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "agenda"
        })
      }
      return res.data;
    }
  );
};
// Add Agenda API
export const saveAgenda =
  async (body: AgendaDetails) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        if (body?.id) {
          formData.append("id", body?.id || "");
        }
        formData.append("leaderid", body?.leaderid || "");
        formData.append("categoryid", body?.categoryid || "");
        formData.append("title", body?.title || "");
        formData.append("description", body?.description || "");
        for (let i = 0; i < body?.attachments?.length; i++) {
          const element = body?.attachments?.[i] as any
          const isFile = element.type !== undefined
          if (isFile) {
            formData.append("attachments", element)
          }
        }
        formData.append("priority", body?.priority || "");
        formData.append("access", body?.access || "");
        formData.append("creation_date", body?.creation_date || "");
        formData.append("saved_by_type", Savedby()?.saved_by_type || "");
        formData.append("saved_by", Savedby()?.saved_by || "");
        const res = await Axios.post(APIRoutes.saveAgenda, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }

//  Update Agenda API
export const editAgenda =
  async (body: any) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("id", body?.id || "");
        formData.append("leaderid", body?.leaderid || "");
        formData.append("categoryid", body?.categoryid || "");
        formData.append("title", body?.title || "");
        formData.append("description", body?.description || "");
        if (body?.attachments.length > 0) {
          for (let i = 0; i < body?.attachments?.length; i++) {
            const element = body?.attachments?.[i]
            formData.append("attachments", element)
          }
        }
        formData.append("priority", body?.priority || "");
        formData.append("access", body?.access || "");
        formData.append("creation_date", body?.creation_date || "");
        formData.append("saved_by_type", Savedby()?.saved_by_type || "");
        formData.append("saved_by", Savedby()?.saved_by || "");
        const res = await Axios.post(APIRoutes.saveAgenda, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }
// Create / Update TimeLine API
export const saveTimeLine =
  async (body: TimeLineFormField, ispost?: any) => {
    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("id", body?.id || "");
        formData.append("leaderid", body?.leaderid || "");
        formData.append("agendaid", body?.agendaid || "");
        formData.append("milestone", body?.milestone || "");
        formData.append("status", body?.status || "");
        formData.append("description", body?.description || "");
        if (body?.attachments?.length != 0) {
          for (let i = 0; i < body?.attachments?.length; i++) {
            const element = body?.attachments?.[i]
            formData.append("attachments", element)

          }
        }


        const res = await Axios.post(APIRoutes.saveTimeLine, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (body?.status == "completed" && ispost == true) {
          Sendnoti({
            tokens: MapFcm(res?.data?.data?.tokens, true),
            description: res?.data?.data?.notification?.description,
            date: res?.data?.data?.notification?.createddate,
            title: res?.data?.data?.notification?.title,
            userimg: res?.data?.data?.notification?.userimg,
            referenceid: res?.data?.data?.notification?.referenceid,
            notificationid: res?.data?.data?.notification?.id,
            type: "post_timeline"
          })
        }
        return res.data;
      }
    );
  }
// Delete Agenda API
export const deleteTimeLine = async (id: string, leaderid: string, agendaid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteTimeLine, { id, leaderid, agendaid });
      return res.data;
    }
  );
};

export const SaveCategory = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.SaveCategory, body);
      return res.data;
    }
  );
};



export const deleteAgendapost = async (id: string, leaderid: string, type: string) => {
  return tryCatch(
    async () => {
      if (type === "agendas") {
        const res = await Axios.post(APIRoutes.DeleteAgendaPost, { id, leaderid });
        return res.data;
      } else {
        const res = await Axios.post(APIRoutes.DeleteDevelopmentPost, { id, leaderid });
        return res.data;
      }
    }
  );
};