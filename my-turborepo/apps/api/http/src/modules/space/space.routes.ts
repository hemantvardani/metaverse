import { Router } from "express";

export const router = Router();

// get all spaces
router.get("/", (req, res) => {});

// delete my space
router.delete("/:spaceId", (req, res) => {});

// get info about particular space
router.get("/:spaceId", (req, res) => {});

// ************** Regarding Elements  in Space*************

// update info of a element in a space
router.put("/element/:spaceElementId", (req, res) => {});

// adding a element in a space
router.post("/element", (req, res) => {});

// delete a element of a space
router.delete("/element/:spaceElementId", (req, res) => {});
