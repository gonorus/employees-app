import axios from 'axios';

export interface BasicInfo {
  fullName: string;
  email: string;
  department: string;
  role: string;
  employeeID: string;
}

const API_BASE_URL = 'http://localhost:4001';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
export const BasicInfoRepository = {
  async getBasicInfoByRole(role: string): Promise<BasicInfo[]> {
    const response = await apiClient.get('/basicInfo', { params: {
      role: role,
    } });
    return response.data;
  },
  async addEmployeeBasicInfo(_: BasicInfo): Promise<string> {
    // const response = await apiClient.post('/details', payload);
    return Promise.resolve('✅ basicInfo saved!');
  },
};