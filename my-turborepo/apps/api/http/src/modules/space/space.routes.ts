import { Router } from "express";

export const router = Router();

// get all spaces
router.get("/", (req, res) => {});

// delete my space
router.delete("/:spaceId", (req, res) => {});

// get info about my space
router.get("/:spaceId", (req, res) => {});

// ************** Regarding Elements  in Space*************

// update a postion info of a element in my space
router.put("/element", (req, res) => {});

// adding a element in a space
router.post("/element", (req, res) => {});

// delete a element of a space
router.post("/element/:elementSpaceMappedId", (req, res) => {});
