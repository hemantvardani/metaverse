"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { MapForm } from "@/components/map/MapForm";
import { mapApi } from "@/lib/api/map";

export default function CreateMapPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    title: string;
    description?: string;
    height: number;
    width: number;
    image: File;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // Step 1: Get presigned URL
      const presignedData = await mapApi.getPresignedUrl({
        fileName: data.image.name,
        fileType: data.image.type,
        fileSize: data.image.size,
        uploadType: "map",
      });

      // Step 2: Upload image to S3
      await mapApi.uploadToS3(presignedData.uploadUrl, data.image);

      // Step 3: Create map with S3 fileKey
      const newMap = await mapApi.create({
        title: data.title,
        description: data.description || "",
        height: data.height,
        width: data.width,
        image: presignedData.fileKey, // Store fileKey, not full URL
      });

      // Step 4: Redirect to edit page
      router.push(`/admin/maps/${newMap.uuid}/edit`);
    } catch (err: any) {
      console.error("Failed to create map:", err);
      setError(err.message || "Failed to create map. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {error && (
          <div className="mb-6 rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        <MapForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminRoute>
  );
}

