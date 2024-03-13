import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

// Add Letter API
export const getTickets = async (leaderid: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getTickets, { leaderid }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

// Add Letter API

export const saveTicketStatus =
  async (formData: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveTicketStatus, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }
// Delete Letter API
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

