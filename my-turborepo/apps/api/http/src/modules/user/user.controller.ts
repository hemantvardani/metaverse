import { userSignUpZ } from "@repo/zod-schema/src";
import { Request, Response } from "express";
import { prismaClient } from "@repo/orm/src"
import { doesUserFieldAlreadyExist } from "./user.services";
import { userSignUpTI } from "./user.types";

export const userSignUp = async (req:Request, res:Response) => { ;

    try {
        const body=req.body;
        const headers=req.headers;
    
        // some field missing or empty fields
        if(!userSignUpZ.safeParse(body).success)
        {
            res.status(400).json({success:false,error:{msg:"Invalid request"}})
        }
        
        //userName already exists
        if(await doesUserFieldAlreadyExist("userName",req?.body?.userName)){
            res.status(409).json({success:false, error:{msg:"User already exist"}})
        }

        // add entry in table
        const user:userSignUpTI=req.body;

        const createUser= await prismaClient.user.create({data:[user]})

        console.log(createUser)
        res.status(200).json({status:true,userId:createUser.id})

        
    } catch(err){
        console.error(err)
    }
    
    
};
