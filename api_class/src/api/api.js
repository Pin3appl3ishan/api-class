import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const instance = axios.create({
  baseUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer" + token;
  }
});

export default instance;
