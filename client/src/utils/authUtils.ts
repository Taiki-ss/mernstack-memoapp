import { AxiosResponse } from "axios";
import authApi from "../api/authApi";

const authUtils = {
  _isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res: AxiosResponse = await authApi.verifyToken();
      return res.data.user;
    } catch {
      return false;
    }
  },
  get isAuthenticated() {
    return this._isAuthenticated;
  },
  set isAuthenticated(value) {
    this._isAuthenticated = value;
  },
};

export default authUtils;
