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



export const fetchDeactiveAccount = async (userid: any, token: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/DeactiveAccount/${userid}`,
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
};
export const fetchCloseAccount = async (leaderid: any, token: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/FollowerList/${leaderid}`,
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
};