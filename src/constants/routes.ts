export const ProtectedRoutes = {
  user: "/user",
  userManagement: "/user-management",
  userProfile: "/user/profile",
  editUserProfile: "/user/profile/settings/personal-information",
  accountSetting: "/user/profile/settings/general"
};

export const AuthRoutes = {
  login: "/",
  register: "/register"
}

export const API_Prefix = "/api";

export const APIRoutes = {
  // Common ENdpoints
  sendOTP: `${API_Prefix}/Common/SendOtp`,
  verifyOTP: `${API_Prefix}/Common/VerifyOtp`,
  getLeadersForDropdown: `${API_Prefix}/Common/GetAddLeadersDropdown`,

  // Leader Endpoints
  login: `${API_Prefix}/Leader/Login`,
  register: `${API_Prefix}/Leader/Registration`,
  upsertLeaders: `${API_Prefix}/Leader/AddEditLeader`,
  getAccessTabs: `${API_Prefix}/Leader/GetAccessTabs/{{userId}}`,
}