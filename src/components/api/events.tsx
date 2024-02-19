import axios from "axios";

export const fetchGetEvents = async (leaderid: string, token: string) => {
  try {
    const respomse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetEvents/${leaderid}`,
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

export const fetchSaveEvent = async (SaveEvent: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/SaveEvent`,
        SaveEvent,
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
  
  export const fetchDeleteEvent = async (DeleteEvent: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeleteEvent`,
        DeleteEvent,
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
