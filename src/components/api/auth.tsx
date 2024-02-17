import Axios from "@/config/axios";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import { LoginData, RegisterData } from "@/utils/typesUtils";

export const fetchLogin = async (body: LoginData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.login, body);
      return res.data;
    }
  );
};

export const fetchRegister = async (body: RegisterData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.register, body);
      return res.data;
    }
  );
};

export const fetchSendOtp = async (body: { mobile: "string" }) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.sendOTP, body);
      return res.data;
    }
  );
};

export const fetchVerifyOtp = async (body: {
  mobile: string;
  otp: string;
}) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.verifyOTP, body);
      return res.data;
    }
  );
};

export const fetchAddLeadersDropdown = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.getLeadersForDropdown);
      return res.data;
    }
  );
};

export const fetchAddEditLeader = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.getAddEditLeaders, body);
      return res.data;
    }
  );
};
