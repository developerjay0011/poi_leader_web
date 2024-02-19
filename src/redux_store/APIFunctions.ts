import Axios from "@/config/axios";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";

// Create / Update Leader API
export const submitLeaderForm = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.upsertLeaders, body);
      return res.data;
    }
  );
};
