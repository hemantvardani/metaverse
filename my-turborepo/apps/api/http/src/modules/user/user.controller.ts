import { userSignInZ, userSignUpZ } from "@repo/zod-schema/dist";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { createUser, doesUserFieldAlreadyExist, doesUserLoginMatch } from "./user.services.js";
import { userSignUpTI } from "./user.types";
import { responsePayloadI } from "@repo/shared-constants/dist/interface.js"
import { JWT_SECRET_KEY } from "../../constants/index.constants.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

/**
 * 
 * @param req 
 * @param res 
 * @return {}
 */
export const userSignUp : RequestHandler = async (req:Request, res:Response, next:NextFunction): Promise<any> => { 
    console.info("User Sign Up Request Incoming.....")
    let responsePayload :responsePayloadI;
    
    try {
        const body=req.body;
        const headers=req.headers;
        
        // some field missing or empty fields
        const safeParsedResult = userSignUpZ.safeParse(body);
        if(!safeParsedResult.success)
        {
            console.error("Request payload schema safe-parsed failed")

            responsePayload={status:"error",message:"Invalid request", error:{ details: [safeParsedResult.error]}};
            return res.status(400).json(responsePayload)
        }
        console.info("Request payload schema safe-parsed successfully")
        
        //userName already exists
        if(await doesUserFieldAlreadyExist("userName",safeParsedResult.data.userName)){
            responsePayload= {status:"error",message:"User already exist"};
            return res.status(409).json(responsePayload)
        }
        console.info("Checked - duplicate user does not existed")

        // add entry in table
        const user:userSignUpTI = safeParsedResult.data;
        const createdUser:any = await createUser(user);

        console.log("createdUser is : ",createdUser)
        if(createdUser?.isSuccess!=true) {
            responsePayload={status:"error",message:"Something went wrong"};
            return res.status(400).json(responsePayload)
        }
        responsePayload = {status:"success",message:"Sign up successful", data:{userId:createdUser?.data?.userId}};
        return res.status(200).json(responsePayload)

        
    } catch(err){
        console.error(err);
        responsePayload={status:"error",message:"Something went wrong"};
        return res.status(500).json(responsePayload)
    }
    
    
};

export const userSignIn:RequestHandler = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    console.info("User Sign In Request Incoming.....")
    let responsePayload:responsePayloadI;
    
    try {
        const safeParsed = userSignInZ.safeParse(req.body);

        if(!safeParsed.success){
            console.error("Request payload schema safe-parsed failed");
            responsePayload={status:"error",message:"Invalid request", error:{ details: [safeParsed.error]}};
            return res.status(400).json(responsePayload);
        }
        console.info("Request payload schema safe-parsed successfully")
        console.log("user is :",safeParsed.data.userName);

        const safeParsedBody= safeParsed.data;

        const result = await doesUserLoginMatch(safeParsedBody)

        if(!result.userValid){
            console.error("Invalid credentials");
            responsePayload={status:"error",message:"Invalid credentials" };
            return res.status(401).json(responsePayload);
        }
        console.log("Credential matches");
        
        if(!result?.user?.userName || !result?.user?.role){
            throw new Error();
        }

        const token = sign({userName:result.user.userName, role: result.user.role}, JWT_SECRET_KEY);
        responsePayload={status:'success', message:"Sign-in successful", data:{token}};

        return res.status(200).json(responsePayload)

    } catch(err){
        console.error(err);
        responsePayload={status:"error", message:"Something went wrong"}
        return res.status(500).json(responsePayload);
    }
}