import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  
  withCredentials: true, // If using cookies; optional
});

export default API;
