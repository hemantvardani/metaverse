import { Request, Response, Router } from "express";
import { createAvatarHandler } from "./design.controllers.js";
export const router = Router();

//create a new map by admin
router.post("/map", (req: Request, res: Response) => {});

//create a new element by admin
router.post("/element", (req: Request, res: Response) => {});

//create a new avatar by admin
router.post("/avatar", createAvatarHandler);
