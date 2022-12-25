import axiosClient from "./axiosClient";

type User = {
  username: string;
  password: string;
  confirmpassword?: string;
};

const authApi = {
  register: (params: User) => axiosClient.post("auth/register", params),
  login: (params: User) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
