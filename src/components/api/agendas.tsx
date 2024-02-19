import axios from "axios";

export const fetchGetAgendas = async (leaderid: string, token: string) => {
  try {
    const respomse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetAgendas/${leaderid}`,
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

export const fetchSaveAgenda = async (SaveAgenda: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/SaveAgenda`,
        SaveAgenda,
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
  
  export const fetchDeleteAgenda = async (DeleteAgenda: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeleteAgenda`,
        DeleteAgenda,
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
