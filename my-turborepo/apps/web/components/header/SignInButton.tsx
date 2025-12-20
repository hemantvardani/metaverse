"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const SignInButton = () => {
  const pathname = usePathname();
  const redirect = pathname !== "/login" && pathname !== "/signup" ? pathname : "/";

  return (
    <Button asChild variant="outline">
      <Link href={`/login?redirect=${encodeURIComponent(redirect)}`}>
        Sign In
      </Link>
    </Button>
  );
};