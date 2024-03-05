import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

// Add Letter API
export const getTickets = async (leaderId: string) => {
  return tryCatch(

    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getTickets, { leaderId }));
      return res.data;
    }
  );
};

// Add Letter API
export const saveTicketStatus =
  async (body: any) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.saveTicketStatus, body);
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

