import { Router } from "express";
import { authenticated } from "../../middleware/index.js";
import { getUserInfo, updateUserInfoHandler, userSignIn, userSignUp } from "./user.controller.js";

export const router = Router();

// for user signup
router.post("/signup",userSignUp)

// for user signin
router.post("/signin", userSignIn)

// updating user fields, like avatar
router.patch("/",authenticated, updateUserInfoHandler)

// get all information about user
router.get("/", authenticated, getUserInfo)