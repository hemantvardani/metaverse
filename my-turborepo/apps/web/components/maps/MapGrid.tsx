"use client";

import { Map } from "@/lib/api/map";
import { MapCard } from "./MapCard";

interface MapGridProps {
  maps: Map[];
  isAdmin?: boolean;
  onCreateSpace?: (mapId: string) => void;
  creatingSpaceId?: string | null;
}

export function MapGrid({ maps, isAdmin = false, onCreateSpace, creatingSpaceId = null }: MapGridProps) {
  if (maps.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No maps available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {maps.map((map) => (
        <MapCard
          key={map.uuid}
          map={map}
          isAdmin={isAdmin}
          onCreateSpace={onCreateSpace}
          isCreating={creatingSpaceId === map.uuid}
        />
      ))}
    </div>
  );
}

