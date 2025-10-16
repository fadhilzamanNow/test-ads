import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

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
