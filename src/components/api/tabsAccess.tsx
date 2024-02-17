import Axios from "@/config/axios";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";

export const fetchAccessTabs = async (userId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getAccessTabs, { userId }));
      return res.data;
    }
  );
};
