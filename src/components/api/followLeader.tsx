export const fetchFollowLeader = async (postBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/FollowLeader`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUnFollowLeader = async (postBody: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/UnFollowLeader`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postBody),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchFollowingList = async (leaderid: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/FollowingList/${leaderid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchTrendingLeaderList = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/TrendingLeaderList`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
