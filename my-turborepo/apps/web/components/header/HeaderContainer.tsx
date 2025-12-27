"use client";

import Link from "next/link";
import { AuthButton } from "./AuthButton";

export const HeaderContainer = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Metaverse</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};