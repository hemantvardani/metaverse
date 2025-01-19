import { Router } from "express";
import { authenticated } from "../../middleware/index.js";
import {
  getUserInfo,
  updateUserInfoHandler,
  userSignIn,
  userSignUp,
} from "./user.controller.js";

export const router = Router();

// for user signup - jest tests done
router.post("/signup", userSignUp);

// for user signin - jest tests done
router.post("/signin", userSignIn);

// updating user fields, like avatar - jest tests done
router.patch("/", authenticated, updateUserInfoHandler);

// get all information about user
router.get("/", authenticated, getUserInfo);
