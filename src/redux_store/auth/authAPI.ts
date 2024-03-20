import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables'
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { LoginData, RegisterData } from '@/utils/typesUtils'
export const registerUser =
  async (body: RegisterData) => {
    return tryCatch(
      async () => {
        const res = await Axios.post(APIRoutes.register, body);
        return res.data;
      }
    );
  }

// Log user in
export const userLogin = async (body: LoginData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.login, body);
      return res.data;
    }
  );
}

export const sendOtp = async (body: { mobile: "string" }) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.sendOTP, body);
      return res.data;
    }
  );
};

export const verifyOtp = async (body: {
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

export const getSingleLeader = async (leaderid: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getSingleLeader, { leaderid }));
      return res.data;
    }
  );
};



export const CheckLeaderUserRegExists = async (body: {
  email: string;
  mobile: string
}) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.CheckLeaderUserRegExists, body);
      return res.data;
    }
  );
};

export const ForgotPassword = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.ForgotPassword, resBody)
    return res.data;
  });
};



