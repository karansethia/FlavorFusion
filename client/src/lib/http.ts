import axios from "axios";

export const axiosReq = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
