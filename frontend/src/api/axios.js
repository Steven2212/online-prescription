import axios from "axios";
import appConfig from "../config/appConfig";

const API = axios.create({
  baseURL: appConfig.API_BASE_URL,
  timeout: appConfig.API_BASE_URL_TIMEOUT
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;