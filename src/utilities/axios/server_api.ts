import axios from 'axios';

const serverApiAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export default serverApiAxios;
