// PAGE Routes
export const ProtectedRoutes = {
  user: "/user",
  userManagement: "/user-management",
  userProfile: "/user/profile",
  editUserProfile: "/user/profile/settings/personal-information",
  accountSetting: "/user/profile/settings/general",
  followers: "/user/profile/followers",
  leader: "/leader"
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
  uploadProfile: `${API_Prefix}/leader/uploadLeaderProfileImge`,
  uploadActivityPictures: `${API_Prefix}/leader/uploadActivityPictures`,
  getTrendingLeaderList: `${API_Prefix}/leader/trendingleaderlist`,
  getNotification: `${API_Prefix}/leader/getleadernotification/{{leaderId}}`,

  //Group Endpoints
  getGroups: `${API_Prefix}/leader/getgroups/{{leaderId}}`,
  saveGroup: `${API_Prefix}/leader/savegroup`,
  getSingleGroup: `${API_Prefix}/leader/getsinglegroupdetail`,

  // Follow Following Endpoints
  getFollowers: `${API_Prefix}/leader/followerList/{{leaderId}}`,
  getFollowering: `${API_Prefix}/leader/followingList/{{leaderId}}`,
  followLeader: `${API_Prefix}/leader/followLeader`,
  unFollowLeader: `${API_Prefix}/leader/unfollowLeader`,

  // Post Endpoint
  getLeaderAddedStories: `${API_Prefix}/post/getLeaderAddedStories/{{leaderId}}`,
  getStoriesForLeader: `${API_Prefix}/post/getStoriesForLeader/{{leaderId}}`,
  GetPostsForLeader: `${API_Prefix}/post/GetPostsForLeader/{{leaderId}}`,
  LikePost: `${API_Prefix}/post/LikePost`,
  CommentPost: `${API_Prefix}/post/CommentPost`,
  UnlikePostorStory: `${API_Prefix}/post/UnlikePostorStory`,
  ReplyToComment: `${API_Prefix}/post/ReplyToComment`,
  LikeComment: `${API_Prefix}/post/LikeComment`,
  UnLikeComment: `${API_Prefix}/post/UnLikeComment`,
  addStories: `${API_Prefix}/post/addStory`,
  deleteStory: `${API_Prefix}/post/deleteStory`,
  addPost: `${API_Prefix}/post/addPost`,
  VoteAdd: `${API_Prefix}/leader/VoteAdd`,
  // Agenda Endpoint
  getAgenda: `${API_Prefix}/leader/getagendas/{{leaderId}}`,
  getCategories: `${API_Prefix}/leader/getcategories/{{leaderId}}`,
  saveAgenda: `${API_Prefix}/leader/saveagenda`,
  deleteAgenda: `${API_Prefix}/leader/deleteagenda`,
  saveTimeLine: `${API_Prefix}/leader/savetimeline`,
  deleteTimeLine: `${API_Prefix}/leader/deletetimeline`,
  makeAgendaPost: `${API_Prefix}/leader/makeagendapost`,

  // Development Endpoint
  getDevelopment: `${API_Prefix}/leader/getdevelopments/{{leaderId}}`,
  saveDevelopment: `${API_Prefix}/leader/savedevelopment`,
  deleteDevelopment: `${API_Prefix}/leader/deletedevelopment`,
  saveDevelopmentTimeLine: `${API_Prefix}/leader/savedevelopmenttimeline`,
  deleteDevelopmentTimeLine: `${API_Prefix}/leader/deletedevelopmenttimeline`,
  makeDevelopmentPost: `${API_Prefix}/leader/makedevelopmentpost`,

  // Directory Endpoint
  getDirectory: `${API_Prefix}/leader/getdirectories/{{leaderId}}`,
  saveDirectory: `${API_Prefix}/leader/savedirectory`,
  deleteDirectory: `${API_Prefix}/leader/deletedirectory`,

  // Directory Endpoint
  getEvents: `${API_Prefix}/leader/getevents/{{leaderId}}`,
  saveEvent: `${API_Prefix}/leader/saveevent`,
  deleteEvent: `${API_Prefix}/leader/deleteevent`,

  // Gallery Endpoint
  getGalleryData: `${API_Prefix}/leader/getgallerydata/{{leaderId}}`,
  saveGallery: `${API_Prefix}/leader/savegallery`,
  deleteGallery: `${API_Prefix}/leader/deletegallerymedia`,
  // Account Setting Endpoint
  closeAccount: `${API_Prefix}/leader/closeaccount/{{leaderId}}`,
  deActiveAccount: `${API_Prefix}/leader/deactiveaccount/{{leaderId}}`,


}