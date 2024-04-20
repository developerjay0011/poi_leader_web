// PAGE Routes
export const ProtectedRoutes = {
  user: "/user",
  userProfile: "/user/profile",
  editUserProfile: "/user/profile/settings/personal-information",
  accountSetting: "/user/profile/settings/general",
  followers: "/user/profile/followers",
  ticket: "/user/ticket",
  feed: "/user/profile/feed",
};


export const EmployeeProtectedRoutes = {
  employee: "/employee-access",
};

export const AuthRoutes = {
  login: "/",
  mlogin: "/login",
  register: "/register",
  leaderinfo: "/leaderinfo",
}

// API Routes
export const API_Prefix = "/api";

export const APIRoutes = {
  // Common ENdpoints
  sendOTP: `${API_Prefix}/common/sendOtp`,
  verifyOTP: `${API_Prefix}/common/verifyOtp`,
  getLeadersForDropdown: `${API_Prefix}/common/getAddLeadersDropdown`,
  GetCategories: `${API_Prefix}/common/GetCategories`,


  // Leader Endpoints
  login: `${API_Prefix}/leader/login`,
  getSingleLeader: `${API_Prefix}/leader/getLeaderProfileAllInfo/{{leaderId}}`,
  DeleteGroups: `${API_Prefix}/leader/DeleteGroups`,
  register: `${API_Prefix}/leader/registration`,
  upsertLeaders: `${API_Prefix}/leader/addEditLeader`,
  getAccessTabs: `${API_Prefix}/leader/getAccessTabs/{{userId}}`,
  getProfile: `${API_Prefix}/leader/getLeaderProfileInfo/{{leaderId}}`,
  uploadProfile: `${API_Prefix}/leader/uploadLeaderProfileImge`,
  uploadActivityPictures: `${API_Prefix}/leader/uploadActivityPictures`,
  getTrendingLeaderList: `${API_Prefix}/leader/trendingleaderlist`,
  getNotification: `${API_Prefix}/leader/getleadernotification/{{leaderId}}/{{employeeId}}`,
  CheckLeaderUserRegExists: `${API_Prefix}/leader/CheckLeaderUserRegExists`,
  ForgotPassword: `${API_Prefix}/leader/ForgotPassword`,
  GetEmployees: `${API_Prefix}/leader/GetEmployees/{{leaderId}}`,
  AddEditEmployee: `${API_Prefix}/leader/AddEditEmployee`,
  GetSingleEmployeeDetail: `${API_Prefix}/leader/GetSingleEmployeeDetail`,
  ChangeActiveStatus: `${API_Prefix}/leader/ChangeActiveStatus`,
  GetLeaderEmployeeTabAccess: `${API_Prefix}/leader/GetLeaderEmployeeTabAccess/{{employeeid}}`,
  SavePermission: `${API_Prefix}/leader/SavePermission`,
  SaveCategory: `${API_Prefix}/leader/SaveCategory`,
  AddMember: `${API_Prefix}/leader/AddMember`,
  DeleteMembers: `${API_Prefix}/leader/DeleteMembers`,
  GetBirthdayList: `${API_Prefix}/leader/GetBirthdayList`,
  DeleteLeaderNotification: `${API_Prefix}/leader/DeleteLeaderNotification`,
  ReadLeaderNotification: `${API_Prefix}/leader/ReadLeaderNotification`,
  ClearAllLeaderNotification: `${API_Prefix}/leader/ClearAllLeaderNotification/{{leaderId}}`,
  GetFiles: `${API_Prefix}/leader/GetFiles/{{leaderId}}`,
  SaveFile: `${API_Prefix}/leader/SaveFile`,
  DeleteFile: `${API_Prefix}/leader/DeleteFile`,
  GetOfficeLocations: `${API_Prefix}/leader/GetOfficeLocations/{{leaderId}}`,
  SaveOfficeLocation: `${API_Prefix}/leader/SaveOfficeLocation`,
  DeleteOfficeLocation: `${API_Prefix}/leader/DeleteOfficeLocation`,
  SaveTicketManually: `${API_Prefix}/leader/SaveTicketManually`,
  GetLeaderList: `${API_Prefix}/leader/GetLeaderList`,
  //Group Endpoints
  getGroups: `${API_Prefix}/leader/getgroups/{{leaderId}}`,
  saveGroup: `${API_Prefix}/leader/savegroup`,
  getSingleGroup: `${API_Prefix}/leader/getsinglegroupdetail`,
  ImportDirectories: `${API_Prefix}/leader/ImportDirectories`,
  // Follow Following Endpoints
  getFollowers: `${API_Prefix}/leader/followerList/{{leaderId}}`,
  getFollowering: `${API_Prefix}/leader/followingList/{{leaderId}}`,
  followLeader: `${API_Prefix}/leader/followLeader`,
  unFollowLeader: `${API_Prefix}/leader/unfollowLeader`,

  // Post Endpoint
  getLeaderAddedStories: `${API_Prefix}/post/getLeaderAddedStories/{{leaderId}}`,
  getStoriesForLeader: `${API_Prefix}/post/getStoriesForLeader/{{leaderId}}`,
  GetPostsForLeader: `${API_Prefix}/post/GetPostsForLeader/{{leaderId}}`,
  GetLeaderAddedPosts: `${API_Prefix}/post/GetLeaderAddedPosts/{{leaderId}}`,
  LikePost: `${API_Prefix}/post/LikePost`,
  DeletePost: `${API_Prefix}/post/DeletePost`,
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
  GetDashboardEvents: `${API_Prefix}/leader/GetDashboardEvents/{{leaderId}}`,

  // polls Endpoint
  getPolls: `${API_Prefix}/leader/getaddedpolls/{{leaderId}}`,
  savePolls: `${API_Prefix}/leader/savepolls`,
  deletePoll: `${API_Prefix}/leader/deletepoll`,

  // Gallery Endpoint
  getGalleryData: `${API_Prefix}/leader/getgallerydata/{{leaderId}}`,
  saveGallery: `${API_Prefix}/leader/savegallery`,
  deleteGallery: `${API_Prefix}/leader/deletegallerymedia`,
  // Account Setting Endpoint
  closeAccount: `${API_Prefix}/leader/closeaccount/{{leaderId}}`,
  deActiveAccount: `${API_Prefix}/leader/deactiveaccount/{{leaderId}}`,

  //Letter & Template Endpoint
  getLetterTemplates: `${API_Prefix}/leader/getlettertemplates/{{leaderId}}`,
  saveLetterTemplates: `${API_Prefix}/leader/savelettertemplate`,
  deleteLetterTemplates: `${API_Prefix}/leader/deletelettertemplate`,

  getLetters: `${API_Prefix}/leader/getletters/{{leaderId}}`,
  saveLetter: `${API_Prefix}/leader/saveletter`,
  deleteLetter: `${API_Prefix}/leader/deleteletter`,

  //Ticket Endpoint
  getTickets: `${API_Prefix}/leader/gettickets/{{leaderId}}`,
  saveTicketStatus: `${API_Prefix}/leader/saveticketstatus`,
  deleteTicketStatus: `${API_Prefix}/leader/deleteticketstatus`,

}