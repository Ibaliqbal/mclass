import axios from "axios";
import { auth } from "../auth";
const headers = {
  "Chace-control": "no-chace",
  Expires: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    return request;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

export default instance;
