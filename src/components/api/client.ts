import axios from "axios";

export const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});



ApiClient.interceptors.request.use((req) => {
  if(req.url === "/api/admin-login") {
    return req
  }
  try {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access_token") || ""
    )}`
  } catch (error) {
    console.warn("No token found")
  }
  return req
})
