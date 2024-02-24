import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { AgendaDetails, TimeLineFormField } from './agendaSlice';

export const getAgenda = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAgenda, { userId }));
      return res.data;
    }
  );
};

export const getCategory = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getCategories, { userId }));
      return res.data;
    }
  );
};
export const deleteAgenda = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteAgenda, { id,leaderid });
      return res.data;
    }
  );
};

export const saveAgenda =
  async (body: AgendaDetails) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("leaderid", body?.leaderid || "");
        formData.append("categoryid", body?.categoryid || "");
        formData.append("title", body?.title || "");
        formData.append("description", body?.description || "");
        for (let i = 0; i < body?.attachments?.length; i++) {
          const element = body?.attachments?.[i]
          formData.append("attachments", element)

        }
        formData.append("priority", body?.priority || "");
        formData.append("access", body?.access || "");
        formData.append("creation_date", body?.creation_date || "");
        formData.append("saved_by_type", body?.saved_by_type || "");
        formData.append("saved_by", body?.saved_by || "");
        console.log(formData);
        const res = await Axios.post(APIRoutes.saveAgenda, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }
  

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
        formData.append("saved_by_type", body?.saved_by_type || "");
        formData.append("saved_by", body?.saved_by || "");
        console.log(formData);
        const res = await Axios.post(APIRoutes.saveAgenda, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }

export const saveTimeLine =
  async (body: TimeLineFormField) => {

    return tryCatch(
      async () => {
        console.log("body",body)
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
        return res.data;
      }
    );
  }
export const deleteTimeLine = async (id: string, leaderid: string, agendaid:string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteTimeLine, { id, leaderid ,agendaid});
      return res.data;
    }
  );
};