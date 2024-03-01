import axios from 'axios';

const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

export const axiosApi = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: window.localStorage.getItem('token')
  }
});
