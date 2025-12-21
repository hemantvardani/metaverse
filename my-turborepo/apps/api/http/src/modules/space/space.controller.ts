import { getPrismaClient } from "@repo/orm/dist";
import { responsePayloadI } from "@repo/shared-constants/dist/interface";
import { Request, Response } from "express";

export const getAllSpacesHandler = async (req: Request, res:Response): Promise<any> =>{

    try {
        const userUuid = req.user?.uuid;
        if(!userUuid){
            console.error("User UUID is required");
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const prismaClient = getPrismaClient();
        const page = Number(req.query.page as string) || 1;
        const limit = Number(req.query.limit as string) || 10;

        const spaces = await prismaClient.space.findMany({
            where:{
                userId: userUuid,
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        res.status(200).json({
            status: "success",
            message: "Spaces fetched successfully",
            data: spaces,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }

}