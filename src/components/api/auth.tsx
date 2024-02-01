import { LoginData, RegisterData } from "@/utils/typesUtils";

export const fetchLogin = async (resBody: LoginData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};

export const fetchRegister = async (resBody: RegisterData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/Registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    console.log("Register", res);
    return res.json();
  } catch (error) {
    return error;
  }
};

export const fetchSendOtp = async (resBody: { mobile: "string" }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Common/SendOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};

export const fetchVerifyOtp = async (VerifyOtp: {
  mobile: string;
  otp: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Common/VerifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(VerifyOtp),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};
