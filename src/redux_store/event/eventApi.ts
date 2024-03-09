import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { EventDetails } from './eventSlice';

// Get Event API
export const getEvents = async (leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getEvents, { leaderid }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

// Delete Agenda API
export const deleteEvent = async (id: string, leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteEvent, { id, leaderid });
      return res.data;
    }
  );
};

// Add Event API
export const saveEvent =
  async (formData: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveEvent, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        return res.data;
      }
    );
  }

// Get Event API
export const GetDashboardEvents = async (leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetDashboardEvents, { leaderid }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};