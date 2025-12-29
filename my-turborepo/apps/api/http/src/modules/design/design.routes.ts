import { Request, Response, Router } from "express";
import {
  createAvatarHandler,
  createElementHandler,
  createMapHandler,
} from "./design.controllers.js";
export const router = Router();

//create a new map by admin (admin middleware already applied at route level)
router.post("/map", createMapHandler);

//create a new element by admin - jest test done
router.post("/element", createElementHandler);

//create a new avatar by admin - jest test done
router.post("/avatar", createAvatarHandler);
