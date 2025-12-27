"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { LogOut, User, Loader2 } from "lucide-react";

export function AuthButton() {
  const { user, isAuthenticated, loading, signingOut, signOut } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (!isAuthenticated) {
    const redirect = pathname !== "/login" && pathname !== "/signup" ? pathname : "/";
    return (
      <Button asChild variant="outline">
        <Link href={`/login?redirect=${encodeURIComponent(redirect)}`}>
          Sign In
        </Link>
      </Button>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span>{user?.userName}</span>
        {user?.role === "ADMIN" && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
            Admin
          </span>
        )}
      </div>
      <Button 
        variant="outline" 
        onClick={handleSignOut} 
        className="gap-2"
        disabled={signingOut}
      >
        {signingOut ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Signing out...</span>
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </>
        )}
      </Button>
    </div>
  );
}

