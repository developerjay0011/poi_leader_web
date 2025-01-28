import { LEADER_FCM_TOKEN_KEY } from "@/constants/common";
import { getCookie } from "cookies-next";
export const MapFcm = (tokens = [], removeown = false) => {
  var token = Array.isArray(tokens) ? [...tokens] : [] as any
  token = token?.map((item: any) => ({ token: item ? item : "" }))
  return token
}


export const Sendnoti = async (data: any) => {
  // let userDetails: any = getCookie(USER_INFO);
  // var notification = {
  //   title: data?.title,
  //   body: data?.description,
  //   content_available: true,
  //   priority: "max",
  //   visibility: "public",
  //   android_channel_id: "Poi_Leader",
  // }
  // var datas = {
  //   referenceid: data?.referenceid || "",
  //   notificationid: data?.notificationid || "",
  //   type: data?.type || "",
  //   leaderid: userDetails?.leaderid
  // }
  // var sendnoti = true
  // if (data?.tokens) {
  //   var tokens = data?.tokens?.map((item) => item?.token || '')?.filter((item) => item != '');
  //   sendnoti = tokens?.length > 0 ? true : false
  //   var params = {
  //     registration_ids: tokens,
  //     notification: notification,
  //     data: datas
  //   }
  //   if (sendnoti) {
  //     await axios(`https://fcm.googleapis.com/fcm/send`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "key=" + "AAAALywba8Y:APA91bGen1HZo0W4AleELnByOO8JZIQxbVvGX1tCbqdFRCO2XMIPsyZAZXgR_FHp4MpmqQ4Gf45qcp0BEp4DFZ0-iTDSqFQ9E38mOItprnFlK5HIds963iv0_H2Xhwn0GTD0ofi9CGCZ",
  //       },
  //       data: params,
  //     }).then(async (response) => {
  //       console.log("Sendnotiresponse", { success: response?.data?.success, failure: response?.data?.failure })
  //     }).catch((error) => {
  //       console.error("Sendnotierror", error)
  //     });
  //   }
  // }
};

export const sendlocalnoti = async (payload: any) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.message,
    data: payload?.data ? payload?.data : {}
  };
  new Notification(notificationTitle, notificationOptions);
};

export const RemoveOwnFcm = (tokens = []) => {
  let fcmtoken: any = getCookie(LEADER_FCM_TOKEN_KEY);
  var token = Array.isArray(tokens) ? [...tokens] : []
  token = token?.filter((item: any) => item?.token != fcmtoken)
  return token
}
