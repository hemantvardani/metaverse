import { userSignUpZ } from "@repo/zod-schema/src";
import { Request, Response } from "express";
import { prismaClient } from "@repo/orm/src"
import { createUser, doesUserFieldAlreadyExist } from "./user.services";
import { userSignUpTI } from "./user.types";
import {responsePayloadI} from "@repo/shared-constants/src/interface"

/**
 * 
 * @param req 
 * @param res 
 * @return {}
 */
export const userSignUp = async (req:Request, res:Response) => { 
    let responsePayload:responsePayloadI;

    try {
        const body=req.body;
        const headers=req.headers;
        
        // some field missing or empty fields
        if(!userSignUpZ.safeParse(body).success)
        {
            responsePayload={status:"error",message:"Invalid request"};
            return res.status(400).json(responsePayload)
        }
        
        //userName already exists
        if(await doesUserFieldAlreadyExist("userName",req?.body?.userName)){
            responsePayload= {status:"error",message:"User already exist"};
            return res.status(409).json(responsePayload)
        }

        // add entry in table
        const user:userSignUpTI=req.body;
        const createdUser:any = await createUser(user);

        console.log(createdUser)
        if(createdUser?.isSuccess!=true) {
            responsePayload={status:"error",message:"Something went wrong"};
            return res.status(400).json(responsePayload)
        }
        responsePayload = {status:"success",message:"Sign up successful", data:{userId:createdUser.id}};
        return res.status(200).json(responsePayload)

        
    } catch(err){
        console.error(err);
        responsePayload={status:"error",message:"Something went wrong"};
        return res.status(400).json(responsePayload)
    }
    
    
};
