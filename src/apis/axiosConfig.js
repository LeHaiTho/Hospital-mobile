import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// cấu hình interceptor
axiosConfig.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers["Content-Type"] = "multipart/form-data";
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosConfig.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // Xử lý lỗi response (lỗi xảy ra khi gửi request)
//     if (error.response) {
//       // Lỗi từ server trả về (có phản hồi từ server)
//       if (error.response.status === 401) {
//         // Xử lý khi bị Unauthorized (401)
//         console.error("Unauthorized. Redirecting to login.");
//         window.location.href = "/login";
//       } else if (error.response.message === "Network Error") {
//         console.error("Network Error");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosConfig;
