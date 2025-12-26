
import { responsePayloadI } from "@repo/shared-constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<responsePayloadI & { data?: T }> {
    const url = `${API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important: include cookies
    });
  
    const data = await response.json();
    
    if (!response.ok || data.status === "error") {
      throw data;
    }
    return data;
  }
  