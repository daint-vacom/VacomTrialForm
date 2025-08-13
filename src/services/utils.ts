import axios, { AxiosInstance } from 'axios';

interface Province {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
}

const api: AxiosInstance = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/v2',
  timeout: 5000,
});

export const getProvinces = async (): Promise<Province[]> => {
  const res = await api.get<Province[]>('/');
  console.log(res);
  return res.data;
};
