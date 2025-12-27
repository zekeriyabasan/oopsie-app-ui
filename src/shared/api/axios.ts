import axios from "axios";
import { getAccessToken } from "../utils/token-storage";

const setAuthToken = () => {
  const token = getAccessToken();
  if (token) {
    return `Bearer ${token}`;
  }
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_OOPSIE_API_URL,
  headers: {
    Authorization: setAuthToken(),
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


