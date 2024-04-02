import Axios from '@/config/axios'
import { insertVariables } from '@/config/insert-variables';
import { tryCatch } from '@/config/try-catch'
import { APIRoutes } from '@/constants/routes'

export const getProfile = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getProfile, { leaderId }));
      return res.data;
    }
  );
};
export const getNotification = async (leaderId: string) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.getNotification, { leaderId }));
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
      return res.data;
    }
  );
};

export const unFollowLeader = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.unFollowLeader, body);
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