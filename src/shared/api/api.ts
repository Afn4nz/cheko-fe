import axios from "axios";
import type { ApiResponse } from "./types";


export const http = axios.create({
  baseURL: "http://localhost:8080/cheko",
  timeout: 12000,
});

// Always return unwrapped payload so features get the raw data array/object
http.interceptors.response.use(
  (resp) => {
    const body = resp.data as ApiResponse<unknown> | unknown;
    if (body && typeof body === "object" && "data" in (body as any)) {
      return (body as any).data; // unwrap { data: ... }
    }
    return body; // already plain
  },
  (err) => Promise.reject(err)
);
