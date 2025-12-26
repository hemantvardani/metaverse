"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { userSignInZ } from "@repo/zod-schema/dist/zod-schema/src/index.js";
import { z } from "zod";
import { api } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


type LoginFormData = {
  userName: string;
  password: string;
}

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(userSignInZ),
    });
  
    const onSubmit = async (data: LoginFormData) => {
      setIsLoading(true);
      setError(null);
  
      try {
        await api.signIn(data.userName, data.password);
        
        // Redirect to previous route or home
        const redirect = searchParams.get("redirect") || "/";
        router.push(redirect);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to sign in");
        setIsLoading(false);
      }
    };
  
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
  
              <div className="space-y-2">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your username"
                  {...register("userName")}
                  aria-invalid={errors.userName ? "true" : "false"}
                />
                {errors.userName && (
                  <p className="text-sm text-destructive">
                    {errors.userName.message}
                  </p>
                )}
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
  