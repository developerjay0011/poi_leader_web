import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { DevelopmentDetails, TimeLineFormField } from './developmentSlice';
import { Savedby } from '@/constants/common';

// Get Development API
export const getDevelopment = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getDevelopment, { userId }));
      return res.data;
    }
  );
};

// Delete Development API
export const deleteDevelopment = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteDevelopment, { id, leaderid });
      return res.data;
    }
  );
};
// Convert Development to Post API
export const makeDevelopmentPost = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.makeDevelopmentPost, { id, leaderid });
      return res.data;
    }
  );
};
// Add Development API
export const saveDevelopment =
  async (body: DevelopmentDetails) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("leaderid", body?.leaderid || "");
        formData.append("categoryid", body?.categoryid || "");
        formData.append("development_title", body?.development_title || "");
        formData.append("description", body?.description || "");
        for (let i = 0; i < body?.attachments?.length; i++) {
          const element = body?.attachments?.[i]
          formData.append("attachments", element)

        }
        formData.append("priority", body?.priority || "");
        formData.append("access", body?.access || "");
        formData.append("creation_date", body?.creation_date || "");
        formData.append("saved_by_type", Savedby()?.saved_by_type || "");
        formData.append("saved_by", Savedby()?.saved_by || "");
        const res = await Axios.post(APIRoutes.saveDevelopment, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }

//  Update Development API
export const editDevelopment =
  async (body: any) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("id", body?.id || "");
        formData.append("leaderid", body?.leaderid || "");
        formData.append("categoryid", body?.categoryid || "");
        formData.append("development_title", body?.development_title || "");
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
        const res = await Axios.post(APIRoutes.saveDevelopment, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }
// Create / Update TimeLine API
export const saveDevelopmentTimeLine =
  async (body: TimeLineFormField) => {

    return tryCatch(
      async () => {
        const formData = new FormData();
        formData.append("id", body?.id || "");
        formData.append("leaderid", body?.leaderid || "");
        formData.append("developmentid", body?.developmentid || "");
        formData.append("milestone", body?.milestone || "");
        formData.append("status", body?.status || "");
        formData.append("description", body?.description || "");
        if (body?.attachments?.length != 0) {
          for (let i = 0; i < body?.attachments?.length; i++) {
            const element = body?.attachments?.[i]
            formData.append("attachments", element)

          }
        }


        const res = await Axios.post(APIRoutes.saveDevelopmentTimeLine, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }
// Delete Development API
export const deleteDevelopmentTimeLine = async (id: string, leaderid: string, developmentid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteDevelopmentTimeLine, { id, leaderid, developmentid });
      return res.data;
    }
  );
};