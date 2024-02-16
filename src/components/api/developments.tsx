import axios from "axios";

export const fetchGetDevelopments = async (leaderid: string, token: string) => {
    try {
      const respomse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetDevelopments/${leaderid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return respomse.data;
    } catch (error) {
      throw error; 
    }
  };
  
  export const fetchSaveDevelopment = async (SaveDevelopment: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/SaveDevelopment`,
        SaveDevelopment,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  export const fetchDeleteDevelopment = async (DeleteDevelopment: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeleteDevelopment`,
        DeleteDevelopment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw error; 
    }
  };