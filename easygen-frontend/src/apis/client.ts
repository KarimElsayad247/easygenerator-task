import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '@/constants/AuthConstants';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
