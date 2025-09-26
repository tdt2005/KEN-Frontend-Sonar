import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " http://localhost:3005/api",
});

// Thêm token vào header trước mỗi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;