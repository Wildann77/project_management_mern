import { useStore } from "@/store/store";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://project-management-mern-backend.vercel.app/api";

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.request.use((config) => {
  const accessToken = useStore.getState().accessToken; // pakai nama state yang sama
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response || {};

    // if (data === "Unauthorized" && status === 401) {
    //   window.location.href = "/";
    // }

    const customError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
