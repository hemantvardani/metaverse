import { Router } from "express";
import { authenticated } from "../../middleware/index.js";
import { fetchAvatarListHandler } from "./avatar.controller.js";

export const router = Router();

// get all avatars list - jest tests done
router.get("/", authenticated, fetchAvatarListHandler);
