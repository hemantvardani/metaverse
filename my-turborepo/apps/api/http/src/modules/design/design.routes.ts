import { Request, Response, Router } from "express";
import {
  createAvatarHandler,
  createElementHandler,
} from "./design.controllers.js";
export const router = Router();

//create a new map by admin
router.post("/map", (req: Request, res: Response) => {});

//create a new element by admin - jest test done
router.post("/element", createElementHandler);

//create a new avatar by admin - jest test done
router.post("/avatar", createAvatarHandler);
