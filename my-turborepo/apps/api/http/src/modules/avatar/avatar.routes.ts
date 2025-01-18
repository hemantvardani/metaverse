import { Router } from "express";
import { authenticated } from "../../middleware/index.js";
import { fetchAvatarListHandler } from "./avatar.controller.js";

export const router = Router();

// get all avatars list
router.get("/", authenticated, fetchAvatarListHandler);
