import { Router } from "express";
import { getAllMapsHandler } from "./map.controllers";

export const router = Router();

// get all maps info
router.get("/", getAllMapsHandler);

// // create "my space"
// router.post("/map", (res, req) => {});
