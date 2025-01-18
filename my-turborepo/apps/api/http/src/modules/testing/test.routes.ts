import { Router } from "express";
import { testFunc } from "./test.controller.js";

export const router = Router();

router.get("/", testFunc);
