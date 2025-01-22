import { responsePayloadI } from "@repo/shared-constants/dist/interface";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { getAllAvatarsList } from "./avatar.services.js";

/**
 *
 * @param req
 * @param res data{ avatars }
 * @param next
 */
export const fetchAvatarListHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  console.info("fetchAvatarListHandler Request Incoming.....");
  let responsePayload: responsePayloadI;

  try {
    const availableAvatars = await getAllAvatarsList();
    responsePayload = {
      status: "success",
      message: "Avatars list successfully fetched",
      data: { avatars: availableAvatars },
    };
    return res.status(200).json(responsePayload);
  } catch {
    console.log("inside catch");
    return res.status(500).send();
  }
};
