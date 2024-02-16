import Axios from "@/config/axios";

export const fetchAccessTabs = async (userid: any) => {
  try {
    const res = await Axios.get(`/api/Leader/GetAccessTabs/${userid}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
