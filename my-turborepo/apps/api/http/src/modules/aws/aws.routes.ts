import { Router } from "express";
import { getPresignedUrlHandler } from "./aws.controllers.js";
import { authorizeAdmin } from "../../middleware/index.js";

export const router = Router();

// Generate presigned URL for file upload (admin only)
// Can be used for maps, avatars, or elements
router.post("/presigned-url", authorizeAdmin, getPresignedUrlHandler);



