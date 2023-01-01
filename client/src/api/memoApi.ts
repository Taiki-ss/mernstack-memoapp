import axiosClient from "./axiosClient";

type Memo = {
  title?: string;
  description?: string;
};

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id: string) => axiosClient.get(`memo/${id}`),
  update: (id: string, params: Memo) => axiosClient.put(`memo/${id}`, params),
};

export default memoApi;
