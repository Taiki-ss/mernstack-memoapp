import axiosClient from "./axiosClient";

type User = {
  username: string;
  password: string;
  confirmpassword: string;
};

const authApi = {
  register: (params: User) => axiosClient.post("auth/register", params),
};

export default authApi;
