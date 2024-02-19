import Axios from "@/config/axios";
import axios from "axios";

/* export const fetchGetSingleCitizen = async (citizenid: any, token: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Citizen/getSingleCitizen/${citizenid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
}; */

/* export const fetchEditCitizenProfile = async (postBody: any, token: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Citizen/EditCitizenProfile`,
      postBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}; */



export const fetchDeactiveAccount = async (userid: any) => {
  try {
    const response = await Axios.get(`/api/Leader/DeactiveAccount/${userid}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchCloseAccount = async (leaderid: any) => {
  try {
    const response = await Axios.get(`/api/Leader/FollowerList/${leaderid}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};