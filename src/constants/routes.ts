export const ProtectedRoutes = {
  user: "/user",
  userManagement: "/user-management"
};

export const AuthRoutes = {
  login: "/",
  register: "/register"
}

export const API_Prefix = "/api";

export const APIRoutes = {
  login: `${API_Prefix}/Leader/Login`,
  register: `${API_Prefix}/Leader/Registration`,
  sendOTP: `${API_Prefix}/Common/SendOtp`,
  verifyOTP: `${API_Prefix}/Common/VerifyOtp`,
  getLeadersForDropdown: `${API_Prefix}/Common/GetAddLeadersDropdown`,
  getAddEditLeaders: `${API_Prefix}/Leader/AddEditLeader`,
  getAccessTabs: `${API_Prefix}/Leader/GetAccessTabs/{{userId}}`,
}