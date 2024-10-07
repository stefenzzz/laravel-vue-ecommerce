import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8003`
})

axiosClient.interceptors.request.use(config => {
  config.headers.Accept = 'application/json';
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})


export default axiosClient;