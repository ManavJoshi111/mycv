import axios from 'axios';
import { successToast, errorToast } from './toasts';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Error in api call : ', error);
    if (error?.response?.status === 401) {
      await callApi('/logout', { method: 'GET' });
    }
    return Promise.reject(error);
  }
);

const callApi = (url, options, data) => {
  switch (options.method) {
    case 'GET':
      return axiosInstance.get(url, options);
    case 'POST':
      return axiosInstance.post(url, data, options);
    case 'PUT':
      return axiosInstance.put(url, data, options);
    case 'DELETE':
      return axiosInstance.delete(url, options);
    default:
      throw new Error('Invalid method');
  }
};

export { callApi, successToast, errorToast };
