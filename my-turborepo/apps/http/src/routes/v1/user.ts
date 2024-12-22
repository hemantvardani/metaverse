import { Router } from "express";
import { authenticated } from "../../middleware/v1";

export const router = Router();

// for user signup
router.post("/signup",(req,res)=>{

})

// for user signin
router.post("/signin",(req,res)=>{

})

// updating user fields, like avatar
router.patch("/",authenticated,(req,res)=>{

})

// get all infor about user
router.get("/", authenticated,(req,res)=>{

})