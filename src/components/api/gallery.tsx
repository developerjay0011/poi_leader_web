import axios from "axios";

export const fetchGetGalleryData = async (leaderid: string, token: string) => {
  try {
    const respomse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetGalleryData/${leaderid}`,
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

export const fetchSaveGallery = async (formData: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/SaveGallery`,
        formData,
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
  
  export const DeleteGalleryMedia = async (DeleteGalleryIds: any, token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeleteGalleryMedia`,
        DeleteGalleryIds,
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
