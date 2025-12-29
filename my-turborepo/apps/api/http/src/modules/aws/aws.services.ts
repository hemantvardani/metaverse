import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
const PRESIGNED_URL_EXPIRY = Number(process.env.S3_PRESIGNED_URL_EXPIRY) || 300; // 5 minutes default

export enum FileType {
  MAP = "map",
  AVATAR = "avatar",
  ELEMENT = "element",
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadType: FileType;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresIn: number;
}

/**
 * Validates file type and size
 */
export const validateFile = (
  fileType: string,
  fileSize: number
): { isValid: boolean; error?: string } => {
  if (!ALLOWED_IMAGE_TYPES.includes(fileType.toLowerCase())) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { isValid: true };
};

/**
 * Generates a unique file key based on upload type
 */
const generateFileKey = (uploadType: FileType, fileName: string): string => {
  const timestamp = Date.now();
  const uuid = randomUUID().split("-")[0]; // Short UUID
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  return `${uploadType}s/${timestamp}-${uuid}.${extension}`;
};

/**
 * Generates a presigned URL for uploading a file to S3
 * Generic function that can be used for maps, avatars, or elements
 */
export const getPresignedUrl = async (
  request: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  // Validate file
  const validation = validateFile(request.fileType, request.fileSize);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Generate unique file key
  const fileKey = generateFileKey(request.uploadType, request.fileName);

  // Create PutObject command
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: request.fileType,
  });

  // Generate presigned URL
  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: PRESIGNED_URL_EXPIRY,
  });

  return {
    uploadUrl,
    fileKey,
    expiresIn: PRESIGNED_URL_EXPIRY,
  };
};

/**
 * Gets the public URL for an S3 file
 */
export const getPublicUrl = (fileKey: string): string => {
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${fileKey}`;
};

