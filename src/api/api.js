import axios from "axios";

import { BASE_URL } from "../config";

const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiService, axios };
