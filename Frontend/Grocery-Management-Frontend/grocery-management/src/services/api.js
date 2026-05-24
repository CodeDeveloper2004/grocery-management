import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

/**
 * Request Interceptor
 * Automatically attach JWT token
 */
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => {

    return Promise.reject(error);

  }
);

/**
 * Response Interceptor
 * Handle unauthorized errors globally
 */
API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      sessionStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;