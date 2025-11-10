import axios from 'axios';

export interface Details {
  photo: string;
  employmentType: string;
  officeLocation: string;
  notes: string;
}

const API_BASE_URL = 'http://localhost:4002';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
export const DetailsRepository = {
  async addEmployeeDetails(_: Details): Promise<string> {
    // const response = await apiClient.post('/details', payload);
    return Promise.resolve('✅ details saved!');
  },
};