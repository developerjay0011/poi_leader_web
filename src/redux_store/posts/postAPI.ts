import Axios from "@/config/axios";
import { getImageUrl } from "@/config/get-image-url";
import { insertVariables } from "@/config/insert-variables";
import { tryCatch } from "@/config/try-catch";
import { APIRoutes } from "@/constants/routes";
import moment from "moment";


export const GetPostsForLeader = async (leaderid: any) => {
  return tryCatch(async () => {
    const res = await Axios.get(insertVariables(APIRoutes.GetPostsForLeader, { leaderid }));
    var data = Array.isArray(res.data) ? res.data : [];
    return ConvertCommonpost(data as any);
  });
};


export const LikePost = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikePost, likeBody);
    return res.data;
  });
};

export const UnlikePostorStory = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnlikePostorStory, UnlikeBody);
    return res.data;
  });
};

export const DeletePost = async (body: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.DeletePost, body);
    return res.data;
  });
};


export const CommentPost = async (resBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.CommentPost, resBody);
    return res.data;
  });
};

const ConvertCommonpost = (list = []): any => {
  var combinedData = [] as any;
  try {
    list?.forEach((userData: any) => {
      var userdetails = { ...userData, developments: [], post: [], agendas: [], polls: [], }
      if (userData?.posts) {
        userData?.posts.forEach((post: any) => {
          combinedData.push({
            post: { ...post, createddate: moment(post?.createddate).format("YYYY-MM-DD hh:mm:ss") },
            type: "post",
            userdetails: userdetails,
          });
        });
      }
      if (userData?.agendas) {
        userData?.agendas.forEach((post: any) => {
          combinedData.push({
            post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD hh:mm:ss") },
            type: "agendas",
            userdetails: userdetails,
          });
        });
      }
      if (userData?.polls) {
        userData?.polls.forEach((post: any) => {
          combinedData.push({
            type: "polls",
            post: { ...post, createddate: moment(post?.publish_date).format("YYYY-MM-DD hh:mm:ss") },
            userdetails: userdetails,
          });
        });
      }
      if (userData?.developments) {
        userData?.developments.forEach((post: any) => {
          combinedData.push({
            type: "developments",
            post: { ...post, createddate: moment(post?.created_date).format("YYYY-MM-DD hh:mm:ss") },
            userdetails: userdetails,
          });
        });
      }
      if (userData?.admin_polls) {
        userData?.admin_polls.forEach((post: any) => {
          combinedData.push({
            type: "polls",
            post: { ...post, createddate: moment(post?.publish_date).format("YYYY-MM-DD hh:mm:ss") },
            userdetails: userdetails,
          });
        });
      }
    });
    combinedData.sort((a: any, b: any) => {
      const dateA = new Date(a.post.createddate);
      const dateB = new Date(b.post.createddate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.log(error)
  }
  return Array.isArray(combinedData) && combinedData;
};


export const VoteAdd = async (VoteAddBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.VoteAdd, VoteAddBody);
    return res.data;
  });
};

export const LikeComment = async (likeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.LikeComment, likeBody);
    return res.data;
  });
};

export const UnLikeComment = async (UnlikeBody: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.UnLikeComment, UnlikeBody);
    return res.data;
  });
};

export const ReplyToComment = async (comment: any) => {
  return tryCatch(async () => {
    const res = await Axios.post(APIRoutes.ReplyToComment, comment);
    return res.data;
  });
};




export const GetLeaderAddedPosts = async (leaderId: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.get(insertVariables(APIRoutes.GetLeaderAddedPosts, { leaderId }));
      return Array.isArray(res.data) ? res.data : []
    }
  );
};

const setStoiesmidea = (posts: any[], heading: { heading: string; profileImage: string }) => {
  const postdata = posts.flatMap((element) =>
    element.media?.map((media: any) => ({
      postid: element.id,
      url: getImageUrl(media.media),
      duration: 5000,
      type: media.type?.includes("image") ? "image" : "video",
      header: {
        ...heading,
        subheading: element.written_text,
      },
    }))
  );

  return postdata || [];
};

export const getLeaderAddedStories = async (leaderId: any, mypostdata: any) => {
  return tryCatch(
    async () => {
      var setdata = []
      const res = await Axios.get(insertVariables(APIRoutes.getLeaderAddedStories, { leaderId }));
      if (Array.isArray(res?.data)) {
        var LeaderAddedStories = await Setmystory(res?.data, mypostdata) as any
        setdata = LeaderAddedStories?.map((item: any, index: number) => ({
          name: item?.name,
          image: item?.image,
          leaderid: item?.leaderid,
          index: index,
          createddate: item?.createddate,
          media: setStoiesmidea(item.posts, { heading: item.name, profileImage: getImageUrl(item.image) })
        }))
      }
      return Array.isArray(setdata) ? setdata : []
    }
  );
};

export const Setmystory = async (list: any[], mypostdata: any) => {
  var setlist = [] as any
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i] as any
      var media = element?.media
      var media2 = [] as any
      for (let t = 0; t < media.length; t++) {
        var type = media?.[t]?.type
        if (type.startsWith("image")) {
          media2.push({ ...media?.[t], thumbnail: t == 0 ? getImageUrl(media?.[t]?.media) : "" })
        }
        if (type.startsWith("video")) {
          var profileurl = t == 0 ? getImageUrl(media?.[t]?.media) : ""
          media2.push({ ...media?.[t], thumbnail: profileurl })
        }
      }
      setlist.push({ ...element, media: media2 })
    }
    const compareDates = (a: any, b: any) => {
      const dateA = new Date(a.createddate);
      const dateB = new Date(b.createddate);

      if (dateA < dateB) {
        return 1; // a is older than b
      } else if (dateA > dateB) {
        return -1; // a is newer than b
      } else {
        // Dates are same, compare times
        const timeA = new Date(a.createddate).getTime();
        const timeB = new Date(b.createddate).getTime();
        return timeB - timeA; // Latest time comes first
      }
    };
    const sortedStories = setlist?.sort(compareDates);
    const combined = sortedStories.reduce((acc: any, story: any) => {
      const date = story.createddate.split(' ')[0];
      const existingIndex = acc.findIndex((item: any) => item.createddate === date);
      if (existingIndex !== -1) {
        acc[existingIndex].posts.push(story);
      } else {
        acc.push({
          createddate: date,
          image: mypostdata?.image,
          name: mypostdata?.name,
          "leaderid": mypostdata?.leaderid,
          "political_party": "",
          "designation": "",
          posts: [story]
        });
      }

      return acc;
    }, []);
    return Array.isArray(combined) ? combined : []
  }
  return []
}

export const getStoriesForLeader = async (leaderId: any) => {
  return tryCatch(
    async () => {
      var setdata = []
      const res = await Axios.get(insertVariables(APIRoutes.getStoriesForLeader, { leaderId })) as any
      if (Array.isArray(res?.data)) {
        setdata = res?.data?.map((item: any, index: number) => ({
          name: item.name,
          leaderid: item.leaderid,
          image: item.image,
          index: index,
          createddate: '',
          media: setStoiesmidea(item.posts, { heading: item.name, profileImage: getImageUrl(item.image) }),
        }));
      }
      return Array.isArray(setdata) ? setdata : []
    }
  );
};

export const addStories = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.addStories, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}

export const deleteStory = async (body: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.deleteStory, body);
      return res.data;
    }
  );
};

export const addPost = async (formData: any) => {
  return tryCatch(
    async () => {
      const res = await Axios.post(APIRoutes.addPost, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data;
    }
  );
}



//  Will remove 










