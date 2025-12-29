import { RequestHandler, Request, Response, NextFunction } from "express";
import { responsePayloadI } from "@repo/shared-constants";
import { getPresignedUrl, FileType, PresignedUrlRequest } from "./aws.services.js";
import { z } from "zod";

const presignedUrlRequestZ = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().positive(),
  uploadType: z.nativeEnum(FileType),
});

/**
 * Generates a presigned URL for file upload to S3
 * Generic endpoint - can be used for maps, avatars, or elements
 */
export const getPresignedUrlHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.info("getPresignedUrlHandler Request Incoming.....");
  let responsePayload: responsePayloadI;

  try {
    // Validate request body
    const safeParsed = presignedUrlRequestZ.safeParse(req.body);

    if (!safeParsed.success) {
      console.error("Request payload schema safe-parsed failed");
      responsePayload = {
        status: "error",
        message: "Invalid request",
        error: { details: [safeParsed.error] },
      };
      res.status(400).json(responsePayload);
      return;
    }

    console.info("Request payload schema safe-parsed successfully");

    const request: PresignedUrlRequest = safeParsed.data;

    // Generate presigned URL
    const result = await getPresignedUrl(request);

    responsePayload = {
      status: "success",
      message: "Presigned URL generated successfully",
      data: result,
    };

    res.status(200).json(responsePayload);
  } catch (error: any) {
    console.error("Error generating presigned URL:", error);
    responsePayload = {
      status: "error",
      message: error.message || "Failed to generate presigned URL",
    };
    res.status(500).json(responsePayload);
  }
};



