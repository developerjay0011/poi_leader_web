import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables'
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { LoginData, RegisterData } from '@/utils/typesUtils'
import { MapFcm, Sendnoti, sendlocalnoti } from '../notification/notification'
export const registerUser = async (body: RegisterData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.register, body);
      if (res?.data?.success) {
        sendlocalnoti({
          message: "Congratulations on registering! Begin by completing your profile to get started.",
          title: "Registration confirmation"
        })
      }
      return res.data;
    }
  );
}

// Log user in
export const userLogin = async (body: LoginData) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.login, body);
      if (res?.data?.success) {
        Sendnoti({
          tokens: MapFcm(res?.data?.data?.tokens),
          description: res?.data?.data?.notification?.description,
          date: res?.data?.data?.notification?.createddate,
          title: res?.data?.data?.notification?.title,
          notificationid: res?.data?.data?.notification?.id,
          type: "login"
        })
      }
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


export const fetchAppinfo = async () => {
  return tryCatch(async () => {
    const res = await Axios.get(APIRoutes.GetLoginScreenCount)
    return res.data;
  });
};
