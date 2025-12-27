"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api/user";
import { PublicFieldsUserFromDB } from "@repo/shared-constants";

interface AuthContextType {
  user: PublicFieldsUserFromDB | null;
  loading: boolean;
  isAuthenticated: boolean;
  signingOut: boolean;
  refetch: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicFieldsUserFromDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await api.getUserInfo();
      setUser(response.data as PublicFieldsUserFromDB);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setSigningOut(true);
    try {
      await api.signOut();
      setUser(null);
      // Refetch to ensure auth state is cleared
      await checkAuth();
    } catch (error) {
      console.error("Sign out error:", error);
      // Even if API call fails, clear local state
      setUser(null);
    } finally {
      setSigningOut(false);
      // Redirect to home page
      window.location.href = "/";
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signingOut,
        refetch: checkAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}



