import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://93.127.185.148:8888/api/v1",
});

// Add request interceptor to attach Bearer token
baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
