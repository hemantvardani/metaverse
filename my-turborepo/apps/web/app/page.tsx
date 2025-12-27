"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mapApi, Map } from "@/lib/api/map";
import { spaceApi, Space } from "@/lib/api/space";
import { MapGrid } from "@/components/maps/MapGrid";
import { SpaceGrid } from "@/components/spaces/SpaceGrid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ERole } from "@repo/shared-constants";
import { useAuth } from "@/lib/auth/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSpace, setCreatingSpace] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch spaces and maps in parallel
      const [spacesData, mapsData] = await Promise.all([
        spaceApi.getAll().catch(() => []),
        mapApi.getAll().catch(() => []),
      ]);

      setSpaces(spacesData);
      setMaps(mapsData);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError("Failed to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSpace = async (mapId: string) => {
    try {
      setCreatingSpace(mapId);
      const newSpace = await spaceApi.create(mapId);
      
      // Refresh spaces list
      const updatedSpaces = await spaceApi.getAll();
      setSpaces(updatedSpaces);

      // Navigate to the new space
      router.push(`/spaces/${newSpace.uuid}/play`);
    } catch (err) {
      console.error("Failed to create space:", err);
      setError("Failed to create space. Please try again.");
      setCreatingSpace(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={loadDashboard}>Retry</Button>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === ERole.ADMIN;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome{user?.userName ? `, ${user.userName}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            Manage your spaces and explore available maps
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* My Spaces Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Spaces</h2>
          </div>
          <SpaceGrid spaces={spaces} />
        </section>

        {/* Available Maps Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Available Maps</h2>
            {isAdmin && (
              <Button asChild variant="outline">
                <a href="/admin/maps/create">Create Map</a>
              </Button>
            )}
          </div>
          <MapGrid
            maps={maps}
            isAdmin={isAdmin}
            onCreateSpace={handleCreateSpace}
            creatingSpaceId={creatingSpace}
          />
        </section>
      </main>
    </div>
  );
}
