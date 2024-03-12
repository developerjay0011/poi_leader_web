export const getImageUrl = (src?: string): string => {
  var image = src ? process.env.NEXT_PUBLIC_BASE_URL + src : "";
  return image;
};

export const setusername = (leaderProfile: any) => {
  var name = leaderProfile?.personal_info?.last_name && leaderProfile?.personal_info?.first_name ? leaderProfile?.personal_info?.first_name + " " + leaderProfile?.personal_info?.last_name : leaderProfile?.personal_info?.first_name;
  return name
};
