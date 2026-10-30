import axios from "axios";

export const api = axios.create({
  baseURL: "/data",
  headers: { "Content-Type": "application/json" },
});