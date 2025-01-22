import { Router } from "express";
import { authenticated } from "../../middleware/index.js";
import { fetchElementListHandler } from "./element.controllers.js";

export const router = Router();

// get all elements list - jest test done
router.get("/", authenticated, fetchElementListHandler);
