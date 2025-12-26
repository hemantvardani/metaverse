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
import { Map } from "@/lib/api/map";
import { Pencil } from "lucide-react";

interface MapCardProps {
  map: Map;
  isAdmin?: boolean;
  onCreateSpace?: (mapId: string) => void;
  isCreating?: boolean;
}

export function MapCard({ map, isAdmin = false, onCreateSpace, isCreating = false }: MapCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <Image
          src={map.image || "/placeholder-map.png"}
          alt={map.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{map.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {map.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button
          className="flex-1"
          onClick={() => onCreateSpace?.(map.uuid)}
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Space"}
        </Button>
        {isAdmin && (
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/maps/${map.uuid}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

