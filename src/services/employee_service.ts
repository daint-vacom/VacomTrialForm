import { IEmployee } from '@/models/employee';
import serverApiAxios, { tempServerAxios } from '@/utilities/axios/server_api';
import { ApiResponse } from '@/utilities/axios/types';

export const getEmployeesApi = async () => {
  return serverApiAxios.get<ApiResponse<IEmployee[]>>('/49e0-55b1-4c7a-9183');
};

export const getEmployeeByCodeApi = async (code: string) => {
  return serverApiAxios.get<ApiResponse<IEmployee>>('/1404-a2d3-4647-9f60');
};

interface AddEmployeePayload {
  imageUrl: string;
  fullName: string;
  employeeCode: string;
  gender: number;
  birthdate: Date;
  phoneNumber: string;
  email: string;
  CNKT: string;
  departmentId: string;
  teamId: string;
  positionId: string;
  dateOfJoining: Date;
  contractSignDate: Date;
  contract: string;
}

export const addEmployeeApi = async (payload: AddEmployeePayload) => {
  return tempServerAxios.post('/api/v1/employee', payload);
};
