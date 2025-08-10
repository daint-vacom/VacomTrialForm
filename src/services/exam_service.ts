import { ExamType } from '@/models/exam';
import serverApiAxios, { tempServerAxios } from '@/utilities/axios/server_api';

interface IExam {
  id: string;
  examType: ExamType;
  name: string;
  term: number;
  round: number;
  examMonth: Date;
  conditionMonth: Date;
  status: number;
}

interface IGetExamResponse {
  returnData: IExam[];
}

export const getExamsApi = async () => {
  return serverApiAxios.get<IGetExamResponse>('/cd30-15ea-476f-a139');
};

interface CreateExamPlanPayload {
  examTypeName: string;
  name: string;
  term: number;
  round: number;
  examMonth: Date;
  conditionMonth: Date;
}

export const createExamPlanApi = async (payload: CreateExamPlanPayload) => {
  return tempServerAxios.post('/api/v1/exam/create-exam', payload);
};
