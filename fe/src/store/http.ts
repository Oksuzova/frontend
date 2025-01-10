import axios, { type AxiosInstance } from 'axios';
import authService from './auth';
import router from "@/router";

const redirectToLogin = (): void => {
  router.push('/login')
};

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const authHeader = authService.getAuthHeader();
  if (authHeader) {
    config.headers['Authorization'] = authHeader;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized: redirecting to login');
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default http;
