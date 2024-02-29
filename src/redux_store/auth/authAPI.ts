import Axios from '@/config/axios'
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'
import { LoginData, RegisterData } from '@/utils/typesUtils'
import { ConnectToAPI } from '@/utils/utility'

const LOGIN_URL = 'http://dev-api.sourceinfosys.in:30702'

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










export const verifyUserId = (phoneNo: string, guid: string) => async () => {
  const body = JSON.stringify({
    eventID: '8',
    addInfo: {
      country_code: '91',
      mobile_no: phoneNo,
      guid,
      email_id: '',
    },
  })

  const res = await ConnectToAPI(`${LOGIN_URL}/login`, body)

  return res
}

export const verifyForgetOTP =
  (phoneNo: string, otp: string, guid: string) => async () => {
    const body = JSON.stringify({
      eventID: '9',
      addInfo: {
        country_code: '91',
        mobile_no: phoneNo,
        otp,
        email_otp: '',
        guid,
        email_id: '',
      },
    })

    const res = await ConnectToAPI(`${LOGIN_URL}/login`, body)

    return res
  }

export const changePassword =
  (userId: string, password: string) => async () => {
    const body = JSON.stringify({
      eventID: '10',
      addInfo: {
        userId,
        pass: password,
        privateKey: '',
      },
    })

    const res = await ConnectToAPI(`${LOGIN_URL}/login`, body)

    return res
  }
