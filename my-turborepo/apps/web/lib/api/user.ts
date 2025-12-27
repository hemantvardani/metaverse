import { apiRequest } from ".";

export const api = {
  // Auth endpoints
  signIn: async (userName: string, password: string) => {
    return apiRequest("/api/v1/user/signin", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
    });
  },

  signUp: async (userName: string, password: string) => {
    return apiRequest("/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
    });
  },

  getUserInfo: async () => {
    return apiRequest("/api/v1/user/", {
      method: "GET",
    });
  },

  signOut: async () => {
    // Clear the httpOnly cookie by calling a signout endpoint
    // If no endpoint exists, we'll handle it client-side
    try {
      await apiRequest("/api/v1/user/signout", {
        method: "POST",
      });
    } catch {
      // If endpoint doesn't exist, that's okay - cookie will expire
    }
  },
};

