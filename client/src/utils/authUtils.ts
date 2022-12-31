import authApi from "../api/authApi";

const authUtils = {
  //トークンチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
      if ("user" in res) {
        return res.user;
      }
    } catch {
      return false;
    }
  },
};

export default authUtils;
