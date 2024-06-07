import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes, API_Prefix } from '@/constants/routes'
import { Sendnoti } from '../notification/notification';
import { Savedby } from '@/constants/common';
import { leaderActions } from './leaderSlice';
import { authActions } from '../auth/authSlice';

export const getProfile = async (leaderId: string, dispatch?: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getProfile, { leaderId }));
      if (res?.data) { } else { dispatch(authActions.logout(true as any)) }
      return res.data;
    }
  );
};
export const getNotification = async (data: any) => {
  return tryCatch(
    async () => {
      var api = `${API_Prefix}/leader/getleadernotification/${data?.leaderId}/${Savedby()?.saved_by_type == "employee" ? data?.employeeId : 0}`
      const res = await Axios.get(api);
      return res.data;
    }
  );
};

export const uploadProfileImage = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.uploadProfile, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res.data;
    }
  );
};



export const uploadActivityPictures = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.uploadActivityPictures, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}

export const getTrendingLeaderList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.getTrendingLeaderList);
      return res.data;
    }
  );
};
// Follow Unfollow API
export const getFollowers = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getFollowers, { leaderId }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};
export const getFollowering = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getFollowering, { leaderId }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

export const followLeader = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.followLeader, body);
      if (res?.data?.success) {
        Sendnoti({
          tokens: res?.data?.data?.tokens,
          description: res?.data?.data?.notification?.description,
          date: res?.data?.data?.notification?.createddate,
          title: res?.data?.data?.notification?.title,
          userimg: res?.data?.data?.notification?.userimg,
          referenceid: res?.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "follow_leader"
        })
      }
      return res.data;
    }
  );
};

export const unFollowLeader = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.unFollowLeader, body);
      if (res?.data?.success) {
        Sendnoti({
          tokens: res?.data?.data?.tokens,
          description: res?.data?.data?.notification?.description,
          date: res?.data?.data?.notification?.createddate,
          title: res?.data?.data?.notification?.title,
          userimg: res?.data?.data?.notification?.userimg,
          referenceid: res?.data?.data?.notification?.referenceid,
          notificationid: res?.data?.data?.notification?.id,
          type: "unfollow_leader"
        })
      }
      return res.data;
    }
  );
};


export const GetBirthdayList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.GetBirthdayList);
      return res.data;
    }
  );
};


export const ClearAllLeaderNotification = async (leaderId: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.ClearAllLeaderNotification, { leaderId }));
      return res.data;
    }
  );
};

export const DeleteLeaderNotification = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.DeleteLeaderNotification, body);
      return res.data;
    }
  );
};

export const ReadLeaderNotification = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.ReadLeaderNotification, body);
      return res.data;
    }
  );
};




export const GetLeaderList = async () => {
  return tryCatch(
    async () => {
      const res = await Axios.get(APIRoutes.GetLeaderList);
      return res.data;
    }
  );
};