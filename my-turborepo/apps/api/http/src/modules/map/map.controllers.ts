import { getPrismaClient } from "@repo/orm/dist/index.js";
import { Request, Response } from "express";

export const getAllMapsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page as string) || 1;
        const limit = Number(req.query.limit as string) || 10;

        const prismaClient = getPrismaClient();
        
        const maps = await prismaClient.map.findMany({
            where: {
                live: true,
            },
            take: limit,
            skip: (page - 1) * limit,
        });
        
        res.status(200).json({
            status: "success",
            message: "Maps fetched successfully",
            data: maps,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
};