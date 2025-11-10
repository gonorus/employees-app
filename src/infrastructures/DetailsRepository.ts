
export interface Details {
  photo: string;
  employmentType: string;
  officeLocation: string;
  notes: string;
}

export const DetailsRepository = {
  async addEmployeeDetails(_: Details): Promise<string> {
    // const response = await apiClient.post('/details', payload);
    return Promise.resolve('✅ details saved!');
  },
};