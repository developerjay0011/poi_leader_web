// PAGE Routes
export const ProtectedRoutes = {
  user: "/user",
  userManagement: "/user-management",
  userProfile: "/user/profile",
  editUserProfile: "/user/profile/settings/personal-information",
  accountSetting: "/user/profile/settings/general",
  followers: "/user/profile/followers"
};

export const AuthRoutes = {
  login: "/",
  register: "/register"
}

// API Routes
export const API_Prefix = "/api";

export const APIRoutes = {
  // Common ENdpoints
  sendOTP: `${API_Prefix}/common/sendOtp`,
  verifyOTP: `${API_Prefix}/common/verifyOtp`,
  getLeadersForDropdown: `${API_Prefix}/common/getAddLeadersDropdown`,

  // Leader Endpoints
  login: `${API_Prefix}/leader/login`,
  register: `${API_Prefix}/leader/registration`,
  upsertLeaders: `${API_Prefix}/leader/addEditLeader`,
  getAccessTabs: `${API_Prefix}/leader/getAccessTabs/{{userId}}`,
  getProfile: `${API_Prefix}/leader/getLeaderProfileInfo/{{leaderId}}`,
  getFollowers: `${API_Prefix}/leader/followerList/{{leaderId}}`,
  uploadProfile: `${API_Prefix}/leader/uploadLeaderProfileImge`,
  getAgenda: `${API_Prefix}/leader/getagendas/{{leaderId}}`,
  getCategories: `${API_Prefix}/leader/getcategories/{{leaderId}}`,
  saveAgenda: `${API_Prefix}/leader/saveagenda`,
  uploadActivityPictures: `${API_Prefix}/leader/uploadActivityPictures`,

  // Post Endpoint
  getLeaderAddedStories: `${API_Prefix}/post/getLeaderAddedStories/{{leaderId}}`,
  getStoriesForLeader: `${API_Prefix}/post/getStoriesForLeader/{{leaderId}}`,
  addStories: `${API_Prefix}/post/addStory`,
  deleteStory: `${API_Prefix}/post/deleteStory`,
  addPost: `${API_Prefix}/post/addPost`,
}