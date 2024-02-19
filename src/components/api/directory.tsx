import axios from "axios";

export const fetchGetDirectories = async (leaderid: string, token: string) => {
  try {
    const respomse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetDirectories/${leaderid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return respomse.data;
  } catch (error) {
    throw error; // You can throw or handle the error as
  }
};

export const fetchSaveDirectory = async (addDirectory: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/SaveDirectory`,
      addDirectory,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // You can throw or handle the error as per your requirement
  }
};
export const fetchDeleteDirectory = async (DeleteDirectory: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeleteDirectory`,
      DeleteDirectory,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // You can throw or handle the error as per your requirement
  }
};
