import { IDepartment, IPosition, ITeam } from '@/models/system';
import serverApiAxios from '@/utilities/axios/server_api';

interface IGetDepartmentsResponse {
  returnData: IDepartment[];
}

interface IGetTeamsResponse {
  returnData: ITeam[];
}

interface IGetPositionsResponse {
  returnData: IPosition[];
}

export const getDepartmentsApi = async () => {
  return serverApiAxios.get<IGetDepartmentsResponse>('/bc84-aa64-475c-b196');
};

export const getTeamsApi = async () => {
  return serverApiAxios.get<IGetTeamsResponse>('/6c06-e2bc-4109-939c');
};

export const getTeamsByDepartmentApi = async (departmentCode: string) => {
  return serverApiAxios.get<IGetTeamsResponse>('/6c06-e2bc-4109-939c');
};

export const getPositionsApi = async () => {
  return serverApiAxios.get<IGetPositionsResponse>('/c633-ef75-4e44-8392');
};
