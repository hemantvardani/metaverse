"use client";

import { Space } from "@/lib/api/space";
import { SpaceCard } from "./SpaceCard";

interface SpaceGridProps {
  spaces: Space[];
}

export function SpaceGrid({ spaces }: SpaceGridProps) {
  if (spaces.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>You haven't created any spaces yet.</p>
        <p className="text-sm mt-2">Browse maps below to create your first space!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {spaces.map((space) => (
        <SpaceCard key={space.uuid} space={space} />
      ))}
    </div>
  );
}






