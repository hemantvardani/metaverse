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

export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadType: "map" | "avatar" | "element";
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresIn: number;
}

export interface CreateMapRequest {
  title: string;
  description: string;
  height: number;
  width: number;
  image: string; // S3 fileKey
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

  getPresignedUrl: async (request: PresignedUrlRequest) => {
    const response = await apiRequest<PresignedUrlResponse>(
      `/api/v1/aws/presigned-url`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );
    return response.data!;
  },

  uploadToS3: async (presignedUrl: string, file: File) => {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return response;
  },

  create: async (data: CreateMapRequest) => {
    const response = await apiRequest<Map>(
      `/api/v1/design/map`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response.data!;
  },
};






