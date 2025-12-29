"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mapFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  height: z.number().min(1).max(1000),
  width: z.number().min(1).max(1000),
});

type MapFormData = z.infer<typeof mapFormSchema>;

interface MapFormProps {
  onSubmit: (data: MapFormData & { image: File }) => Promise<void>;
  isLoading?: boolean;
}

export function MapForm({ onSubmit, isLoading = false }: MapFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MapFormData>({
    resolver: zodResolver(mapFormSchema),
    defaultValues: {
      height: 100,
      width: 100,
    },
  });

  const height = watch("height") || 100;
  const width = watch("width") || 100;

  const onFormSubmit = async (data: MapFormData) => {
    if (!imageFile) {
      setImageError("Please select an image");
      return;
    }

    setImageError("");
    await onSubmit({ ...data, image: imageFile });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Map</CardTitle>
          <CardDescription>
            Configure your map dimensions and upload the base tile image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Office Space"
              {...register("title")}
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your map..."
              {...register("description")}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (tiles) *</Label>
              <Input
                id="height"
                type="number"
                min={1}
                max={1000}
                {...register("height", { valueAsNumber: true })}
                aria-invalid={errors.height ? "true" : "false"}
              />
              {errors.height && (
                <p className="text-sm text-destructive">
                  {errors.height.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Width (tiles) *</Label>
              <Input
                id="width"
                type="number"
                min={1}
                max={1000}
                {...register("width", { valueAsNumber: true })}
                aria-invalid={errors.width ? "true" : "false"}
              />
              {errors.width && (
                <p className="text-sm text-destructive">
                  {errors.width.message}
                </p>
              )}
            </div>
          </div>

          {/* Grid Preview */}
          {height > 0 && width > 0 && (
            <div className="space-y-2">
              <Label>Grid Preview</Label>
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">
                  {height} × {width} tiles ({height * width} total tiles)
                </p>
                <div
                  className="grid gap-1 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(width, 20)}, 1fr)`,
                    maxWidth: "100%",
                  }}
                >
                  {Array.from({ length: Math.min(height * width, 200) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-primary/20 rounded border border-primary/30"
                        style={{ minWidth: "4px", minHeight: "4px" }}
                      />
                    )
                  )}
                </div>
                {height * width > 200 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Showing first 200 tiles...
                  </p>
                )}
              </div>
            </div>
          )}

          <ImageUpload
            value={imageFile}
            onChange={(file) => {
              setImageFile(file);
              setImageError("");
            }}
            error={imageError}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Map...
              </>
            ) : (
              "Create Map"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

