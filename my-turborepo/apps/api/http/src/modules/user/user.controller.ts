import { userSignUpZ } from "@repo/zod-schema/dist";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { createUser, doesUserFieldAlreadyExist } from "./user.services.js";
import { userSignUpTI } from "./user.types";
import { responsePayloadI } from "@repo/shared-constants/dist/interface.js"

/**
 * 
 * @param req 
 * @param res 
 * @return {}
 */
export const userSignUp : RequestHandler = async (req:Request, res:Response, next:NextFunction): Promise<any> => { 
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
        if(await doesUserFieldAlreadyExist("userName",req?.body?.userName)){
            responsePayload= {status:"error",message:"User already exist"};
            return res.status(409).json(responsePayload)
        }
        console.info("Checked - duplicate user does not existed")

        // add entry in table
        const user:userSignUpTI=req.body;
        const createdUser:any = await createUser(user);

        console.log("createdUser is : ",createdUser)
        if(createdUser?.isSuccess!=true) {
            responsePayload={status:"error",message:"Something went wrong"};
            return res.status(400).json(responsePayload)
        }
        responsePayload = {status:"success",message:"Sign up successful", data:{userId:createdUser?.data?.id}};
        return res.status(200).json(responsePayload)

        
    } catch(err){
        console.error(err);
        responsePayload={status:"error",message:"Something went wrong"};
        return res.status(400).json(responsePayload)
    }
    
    
};
