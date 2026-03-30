import axios from "axios";
import { getAccessToken } from "../utils/auth";

const axiosClient = axios.create({
  baseURL: "https://localhost:7212/api"
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;