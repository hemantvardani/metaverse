"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Space } from "@/lib/api/space";
import { Play } from "lucide-react";

interface SpaceCardProps {
  space: Space;
}

export function SpaceCard({ space }: SpaceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <Image
          src={space.map?.image || "/placeholder-space.png"}
          alt={space.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{space.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {space.map ? `Based on: ${space.map.title}` : "Space"}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/spaces/${space.uuid}/play`}>
            <Play className="mr-2 h-4 w-4" />
            Enter Space
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

