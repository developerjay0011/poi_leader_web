export const fetchAccessTabs = async (userid: any, token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Leader/GetAccessTabs/${userid}`,
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
