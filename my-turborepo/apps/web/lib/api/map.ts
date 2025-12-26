import { apiRequest } from "./index";

export interface Map {
  uuid: string;
  title: string;
  description: string;
  image: string;
  height: number;
  width: number;
  live: boolean;
}

export const mapApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiRequest<Map[]>(
      `/api/v1/map?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
    return response.data || [];
  },
};






