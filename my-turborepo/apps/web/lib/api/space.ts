import { apiRequest } from "./index";

export interface Space {
  uuid: string;
  title: string;
  mapId: string;
  userId: string;
  map?: {
    uuid: string;
    title: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const spaceApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiRequest<Space[]>(
      `/api/v1/space?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
    return response.data || [];
  },
  create: async (mapId: string, title?: string) => {
    const response = await apiRequest<Space>(
      `/api/v1/space`,
      {
        method: "POST",
        body: JSON.stringify({ mapId, title }),
      }
    );
    return response.data;
  },
};

