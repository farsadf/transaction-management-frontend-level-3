import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_INFRA_URI,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errors) {
      error.message = error.response.data.errors.join("\n");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
